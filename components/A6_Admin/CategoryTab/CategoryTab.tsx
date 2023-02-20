import {useState} from "react";
import style from "./CategoryTab.module.scss"
import {DeleteModal} from "../DeleteModal/DeleteModal";
import {Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {CategoryCreateType, ICategory} from "../../../types/category.type";
import {categoryAPI} from "../../../api/category.api";
import Collapse from "@mui/material/Collapse";
import {CategoryForm} from "../CategoryForm/CategoryForm";
import {sortOrderedItemByOrder} from "../../../helpers/helpers";
import {PortfolioItem} from "../PortfolioItem/PortfolioItem";
import {CategoryItem} from "../CategoryItem/CategoryItem";
import {portfolioAPI} from "../../../api/portfolio.api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";

export const CategoryTab = observer(() => {
    const { deleteId } = useStore();

    const [showAddForm, setShowAddForm] = useState(false);
    const onFormClickHandler = () => setShowAddForm(!showAddForm);

    // GET
    const {
        isFetching,
        data: items,
    } = useQuery<ICategory[], AxiosError>({
        queryKey: ["categories"],
        queryFn: () => categoryAPI.getAll(),
    });

    // CREATE
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: categoryAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            queryClient.invalidateQueries({queryKey: ['sliders']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });
    const initialValues = {
        name: "",
    }
    const onCreateHandler = async (categoryCreateData: CategoryCreateType) => {
        await createMutation.mutateAsync(categoryCreateData);
        setShowAddForm(false);
    }

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: categoryAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            queryClient.invalidateQueries({queryKey: ['sliders']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });

    return (
        <div className={style.categoryTab}>
            <DeleteModal title="Delete category of portfolio?"
                         //mutateAsyncFn={deleteMutation.mutateAsync}
                         isLoading={deleteMutation.isLoading}
                         deleteHandler={async () => {
                             await deleteMutation.mutateAsync(deleteId)
                         }}
            />

            <div className={style.top}>
                <div className={style.titleWrapper}>
                    <Typography variant="h5">List of categories of portfolio works</Typography>
                    {
                        isFetching &&
                        <div className={style.preloader}>
                            <CircularProgress size={30} sx={{color: "#FFF!important"}}/>
                        </div>
                    }
                </div>


                <Button variant="contained"
                        size='large'
                        color={showAddForm ? "error" : "success"}
                        startIcon={showAddForm ? <CloseIcon/> : <AddCircleOutlineIcon/>}
                        onClick={onFormClickHandler}
                        className={style.addFormBtn}
                >
                    {showAddForm ? "Close form" : "Add category"}
                </Button>
            </div>

            <Collapse in={showAddForm}>
                <CategoryForm label="Create category"
                              initialValues={initialValues}
                              onSubmitHandler={onCreateHandler}
                />
            </Collapse>

            {
                items && (
                    <div className={style.items}>
                        {
                            items.map(item => (
                                <CategoryItem key={item.id}
                                              item={item}
                                              isLoadingItems={isFetching}
                                />
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
})
