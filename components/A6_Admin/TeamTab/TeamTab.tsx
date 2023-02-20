import style from "./TeamTab.module.scss";
import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IMember, UpdateMemberType} from "../../../types/member.type";
import {memberAPI} from "../../../api/member.api";
import {replaceItemsInList} from "../../../helpers/replaceItemsInList";
import {DeleteModal} from "../DeleteModal/DeleteModal";
import {Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Collapse from "@mui/material/Collapse";
import {TeamForm} from "../TeamForm/TeamForm";
import {sortOrderedItemByOrder} from "../../../helpers/helpers";
import * as React from "react";
import {TeamItem} from "../TeamItem/TeamItem";
import {useStore} from "../../../store/useStore";
import {observer} from "mobx-react-lite";

export const TeamTab = observer(() => {
    const { deleteId } = useStore();
    const [showAddForm, setShowAddForm] = useState(false);
    const onFormClickHandler = () => setShowAddForm(!showAddForm);

    // GET MEMBERS
    const {
        isFetching,
        data: items,
    } = useQuery<IMember[], AxiosError>({
        queryKey: ["members"],
        queryFn: () => memberAPI.getAll(),
    })

    // items - из бэкенда
    // itemsLocal - локальное значение, меняется при перетаскивании
    // при отпускании карточки - itemsLocal = {id, order} отправляется на сервер и переписывает items
    const [itemsLocal, setItemsLocal] = useState(items);
    useEffect(() => {
        setItemsLocal(items)
    }, [items])
    const replaceItems = (id1: string, id2: string) => setItemsLocal(replaceItemsInList(id1, id2, itemsLocal as IMember[]))

    // CREATE
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: memberAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['members']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });
    const onCreateHandler = async (createData: UpdateMemberType) => {
        await createMutation.mutateAsync(createData);
        setShowAddForm(false);
    }

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: memberAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['members']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });


    return (
        <div className={style.teamTab}>

            <DeleteModal title="Delete team member?"
                         deleteHandler={async () => {
                             await deleteMutation.mutateAsync(deleteId)
                         }}
                         isLoading={deleteMutation.isLoading}
            />

            <div className={style.top}>
                <div className={style.titleWrapper}>
                    <Typography variant="h5">List of team members</Typography>
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
                    {showAddForm ? "Close form" : "Add team member"}
                </Button>
            </div>


            <Collapse in={showAddForm}>
                <TeamForm label="Create team member"
                          initialValues={{
                              name: "",
                              position: "",
                              img: "",
                          }}
                          onSubmitHandler={onCreateHandler}
                />
            </Collapse>

            {
                items && itemsLocal && (
                    <div className={style.items}>
                        {
                            [...itemsLocal]
                                .sort(sortOrderedItemByOrder)
                                .map(item => (
                                    <TeamItem key={item.id}
                                                   item={item}
                                                   replaceItems={replaceItems}
                                                   items={items}
                                                   list={itemsLocal}
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
