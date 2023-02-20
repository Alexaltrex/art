import style from "./CategoryItem.module.scss";
import Typography from "@mui/material/Typography";
import {IconButton} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Collapse from "@mui/material/Collapse";
import {useStore} from "../../../store/useStore";
import {observer} from "mobx-react-lite";
import {FC, useState} from "react";
import {CategoryCreateType, ICategory} from "../../../types/category.type";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {categoryAPI} from "../../../api/category.api";
import {CategoryForm} from "../CategoryForm/CategoryForm";

interface ICategoryItem {
    item: ICategory
    isLoadingItems: boolean
}

export const CategoryItem: FC<ICategoryItem> = observer(({
                                                             item: {id, name},
                                                             isLoadingItems,
                                                         }) => {
    const {setDeleteModal, setDeleteId} = useStore();

    //========= OPEN DELETE MODAL =========//
    const onShowDeleteModal = () => {
        setDeleteModal(true);
        setDeleteId(id);
    };

    //========= UPDATE CATEGORY =========//
    const [showForm, setShowForm] = useState(false);
    const onEditHandler = () => setShowForm(!showForm);
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: categoryAPI.update,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            queryClient.invalidateQueries({queryKey: ['sliders']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });
    const initialValues = {name};
    const onUpdateHandler = async (updateData: CategoryCreateType) => {
        await updateMutation.mutateAsync({id, updateData});
    }

    return (
        <div className={style.categoryItemWrapper}>

            <div className={style.categoryItem}>

                <div className={style.nameWrapper}>
                    <Typography className={style.name}>{name}</Typography>
                </div>

                <IconButton className={style.editButton}
                            onClick={onEditHandler}
                >
                    {
                        (isLoadingItems || updateMutation.isLoading) && showForm && (
                            <div className={style.preloaderWrapper}>
                                <CircularProgress size={32} sx={{color: "#FFF!important"}} className={style.preloader}/>
                            </div>
                        )
                    }
                    {
                        !(isLoadingItems || updateMutation.isLoading) && showForm && <CloseIcon sx={{fontSize: "32px", color: "#FFF"}}/>
                    }
                    {
                        !showForm && <EditIcon sx={{fontSize: "32px", color: "#FFF"}}/>
                    }
                    <Typography className={style.label}>
                        {showForm ? "CLOSE" : "EDIT"}
                    </Typography>
                </IconButton>

                <Button variant="contained"
                        className={style.deleteButton}
                        startIcon={<DeleteForeverIcon sx={{fontSize: "32px!important"}}/>}
                        onClick={onShowDeleteModal}
                        sx={{fontSize: "16px"}}
                >
                    Delete
                </Button>

            </div>

            <Collapse in={showForm}>
                <div style={{marginTop: "8px"}}>
                    <CategoryForm label="Update category"
                                   initialValues={initialValues}
                                   onSubmitHandler={onUpdateHandler}
                    />
                </div>
            </Collapse>

        </div>

    )
})
