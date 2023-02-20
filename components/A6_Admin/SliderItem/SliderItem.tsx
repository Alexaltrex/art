import style from "./SliderItem.module.scss"
import {FC, useEffect, useState} from "react";
import {ICreateSlide, ISlide, ISlider} from "../../../types/slider.type";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {Button, IconButton} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {SlideItem} from "../SlideItem/SlideItem";
import {IPortfolio, IPortfolioFormValues} from "../../../types/portfolio.type";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import {FieldsetCustom} from "../../Y_admin/FieldsetCustom/FieldsetCustom";
import {FieldLoadImage} from "../../Y_admin/FieldLoadImage/FieldLoadImage";
import SaveIcon from "@mui/icons-material/Save";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {portfolioAPI} from "../../../api/portfolio.api";
import {sliderAPI} from "../../../api/slider.api";
import {replaceItemsInList} from "../../../helpers/replaceItemsInList";
import {sortOrderedItemByOrder} from "../../../helpers/helpers";

interface ISliderItem {
    slider: ISlider
}

export const SliderItem: FC<ISliderItem> = ({
                                                slider: {
                                                    id,
                                                    category,
                                                    slides
                                                }
                                            }) => {
    //========= EDIT =========//
    const [showContent, setShowContent] = useState(false);
    const onEditHandler = () => setShowContent(!showContent);

    // items - из бэкенда
    // itemsLocal - локальное значение, меняется при перетаскивании
    // при отпускании карточки - itemsLocal = {id, order} отправляется на сервер и переписывает items
    const [itemsLocal, setItemsLocal] = useState(Object.values(slides));
    useEffect(() => {
        setItemsLocal(Object.values(slides))
    }, [slides]);
    const replaceItems = (id1: string, id2: string) => {
        console.log("replaceItems")
        console.log(replaceItemsInList(id1, id2, [...itemsLocal] as ISlide[]))
        setItemsLocal(replaceItemsInList(id1, id2, itemsLocal as ISlide[]))
    }
    //console.log(itemsLocal)

    //========= ADD SLIDE TO SLIDER =========//
    const queryClient = useQueryClient();
    const addSlideToSliderMutation = useMutation({
        mutationFn: sliderAPI.addSlideToSlider,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sliders']});
        },
        onError: (e: any) => {
            //const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });

    //========= FORM =========//
    const initialValues: ICreateSlide = {
        src: ""
    }
    const validate = (values: ICreateSlide): FormikErrors<ICreateSlide> => {
        const errors = {} as FormikErrors<ICreateSlide>
        if (!values.src) {
            errors.src = "Required"
        }
        return errors
    }
    const onSubmit = async (values: ICreateSlide, formikHelpers: FormikHelpers<ICreateSlide>) => {
        try {
            console.log(values)
            await addSlideToSliderMutation.mutateAsync({
                createSlide: values,
                categoryId: id,
            })
        } catch (e: any) {
            console.log(e.message);
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    };


    return (
        <div className={style.sliderItem}>

            <div className={style.header}>

                <div className={style.nameWrapper}>
                    <Typography className={style.label}>category:</Typography>
                    <Typography className={style.name}>{category}</Typography>
                </div>

                <IconButton className={style.editButton}
                            onClick={onEditHandler}
                >
                    {
                        showContent
                            ? <CloseIcon sx={{fontSize: "32px", color: "#FFF"}}/>
                            : <EditIcon sx={{fontSize: "32px", color: "#FFF"}}/>
                    }
                    <Typography className={style.label}>
                        {showContent ? "CLOSE" : "EDIT"}
                    </Typography>
                </IconButton>

            </div>

            <Collapse in={showContent}>
                <div className={style.content}>
                    <div>
                        {
                            [...itemsLocal]
                                .sort(sortOrderedItemByOrder)
                                .map(slide => (
                                <SlideItem key={slide.id}
                                           sliderId={id}
                                           slide={slide}
                                           replaceItems={replaceItems}
                                           items={Object.values(slides)}
                                           list={itemsLocal}
                                />
                            ))
                        }
                    </div>

                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validate={validate}
                    >
                        <FieldsetCustom label="Add image"
                                        className={style.fieldset}
                        >
                            <Form className={style.form}>
                                <FieldLoadImage name="src"
                                                label="Image"
                                                className={style.field}
                                                description=""
                                />

                                <Button type="submit"
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        startIcon={<SaveIcon/>}
                                        className={style.btn}
                                >
                                    Add image to slider
                                </Button>
                            </Form>
                        </FieldsetCustom>

                    </Formik>


                </div>
            </Collapse>

        </div>
    )
}
