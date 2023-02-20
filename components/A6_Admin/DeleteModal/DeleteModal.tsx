import {Dialog, DialogContent, IconButton} from "@mui/material";
import style from "./DeleteModal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {FC} from "react";

interface IDeleteModal {
    title: string
    isLoading: boolean
    deleteHandler: () => Promise<void>
}

export const DeleteModal: FC<IDeleteModal> = observer(({
                                                           title,
                                                           isLoading,
                                                           deleteHandler
                                                       }) => {
    const {
        deleteModal,
        setDeleteModal,
        deleteId,
    } = useStore();

    const onCloseHandler = () => setDeleteModal(false);

    const onDeleteHandler = async () => {
        try {
            await deleteHandler();
            onCloseHandler();
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <Dialog open={deleteModal}
                onClose={() => onCloseHandler()}
                maxWidth='xs'
                sx={{
                    "& .MuiPaper-root": {
                        width: 500,
                        margin: "16px",
                        borderRadius: "10px"
                    }
                }}
        >
            <DialogTitle color='primary'
                         className={style.dialogTitle}
            >
                {title}
                <IconButton className={style.closeBtn}
                            onClick={onCloseHandler}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{
                padding: "20px 24px 20px!important"
            }}
                           className={style.dialogContent}
            >

                <Button variant="contained"
                        color="error"
                        startIcon={isLoading ? undefined : <DeleteForeverIcon/>}
                        fullWidth
                        onClick={onDeleteHandler}
                        className={style.btn}
                >
                    {isLoading ? "Deleting..." : "Delete"}
                </Button>

                <Button variant="contained"
                        startIcon={<CloseIcon/>}
                        sx={{marginLeft: "16px"}}
                        fullWidth
                        onClick={onCloseHandler}
                        className={style.btn}
                >
                    Cancel
                </Button>

            </DialogContent>

        </Dialog>
    )
})
