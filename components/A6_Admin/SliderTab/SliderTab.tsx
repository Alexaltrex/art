import style from "./SliderTab.module.scss"
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ISlider} from "../../../types/slider.type";
import {sliderAPI} from "../../../api/slider.api";
import {DeleteModal} from "../DeleteModal/DeleteModal";
import {Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {SliderItem} from "../SliderItem/SliderItem";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";

export const SliderTab = observer(() => {
    const {
        deleteId,
        deleteSliderId
    } = useStore();

    // GET SLIDERS
    const {
        isFetching,
        data: items,
    } = useQuery<ISlider[], AxiosError>({
        queryKey: ["sliders"],
        queryFn: () => sliderAPI.getAll(),
    })

    // CREATE SLIDE
    // const queryClient = useQueryClient();
    // const createMutation = useMutation({
    //     mutationFn: portfolioAPI.create,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({queryKey: ['portfolios']});
    //     },
    //     onError: (e: any) => {
    //         const message = e?.response?.data?.message ?? e.message;
    //         //dispatch(setSnackbar({open: true, message, severity: "error"}))
    //     }
    // });
    // const onCreateHandler = async (portfolioUpdateData: IPortfolioFormValues) => {
    //     await createMutation.mutateAsync(portfolioUpdateData);
    //     setShowAddForm(false);
    // }

    //========= DELETE SLIDE FROM SLIDER =========//
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: sliderAPI.deleteSlideFromSlider, //({sliderId, slideId: id}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sliders']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    })

    return (
        <div className={style.sliderTab}>

            <DeleteModal title="Delete portfolio?"
                         isLoading={deleteMutation.isLoading}
                         deleteHandler={async () => {
                             await deleteMutation.mutateAsync({slideId: deleteId, sliderId: deleteSliderId});
                         }}
            />

            <div className={style.top}>
                <div className={style.titleWrapper}>
                    <Typography variant="h5">Sliders of portfolios category</Typography>
                    {
                        isFetching &&
                        <div className={style.preloader}>
                            <CircularProgress size={30} sx={{color: "#FFF!important"}}/>
                        </div>
                    }
                </div>
            </div>

            {
                items && (
                    <div className={style.items}>
                        {
                            items.map(item => (
                                <SliderItem key={item.id} slider={item}/>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
})
