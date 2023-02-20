import style from "./PortfolioTab.module.scss"
import {IPortfolio, IPortfolioFormValues} from "../../../types/portfolio.type";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {portfolioAPI} from "../../../api/portfolio.api";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {PortfolioForm} from "../PortfolioForm/PortfolioForm";
import {DeleteModal} from "../DeleteModal/DeleteModal";
import {PortfolioItem} from "../PortfolioItem/PortfolioItem";
import {replaceItemsInList} from "../../../helpers/replaceItemsInList";
import {sortOrderedItemByOrder} from "../../../helpers/helpers";
import Collapse from "@mui/material/Collapse";
import {ICategory} from "../../../types/category.type";
import {categoryAPI} from "../../../api/category.api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";

export const PortfolioTab = observer(() => {
    const { deleteId } = useStore();

    const [showAddForm, setShowAddForm] = useState(false);
    const onFormClickHandler = () => setShowAddForm(!showAddForm);

    // GET PORTFOLIOS
    const {
        isFetching,
        data: items,
    } = useQuery<IPortfolio[], AxiosError>({
        queryKey: ["portfolios"],
        queryFn: () => portfolioAPI.getAll(),
    })

    // GET CATEGORIES
    const {
        isFetching: isFetchingCategories,
        data: categories
    } = useQuery<ICategory[], AxiosError>({
        queryKey: ["categories"],
        queryFn: () => categoryAPI.getAll(),
    });

    // items - из бэкенда
    // itemsLocal - локальное значение, меняется при перетаскивании
    // при отпускании карточки - itemsLocal = {id, order} отправляется на сервер и переписывает items
    const [itemsLocal, setItemsLocal] = useState(items);
    useEffect(() => {
        setItemsLocal(items)
    }, [items])
    const replaceItems = (id1: string, id2: string) => setItemsLocal(replaceItemsInList(id1, id2, itemsLocal as IPortfolio[]))

    // CREATE
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: portfolioAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['portfolios']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });
    const onCreateHandler = async (portfolioUpdateData: IPortfolioFormValues) => {
        await createMutation.mutateAsync(portfolioUpdateData);
        setShowAddForm(false);
    }

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: portfolioAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['portfolios']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });


    return (
        <div className={style.portfolioTab}>

            <DeleteModal title="Delete portfolio?"
                         isLoading={deleteMutation.isLoading}
                         deleteHandler={async () => {
                             await deleteMutation.mutateAsync(deleteId)
                         }}

            />

            <div className={style.top}>
                <div className={style.titleWrapper}>
                    <Typography variant="h5">List of portfolio work</Typography>
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
                        disabled={isFetchingCategories}
                >
                    {showAddForm ? "Close form" : "Add portfolio"}
                </Button>
            </div>

            {
                categories && (
                    <Collapse in={showAddForm}>
                        {
                            categories && (
                                <PortfolioForm label="Create portfolio"
                                               initialValues={{
                                                   name: "",
                                                   year: "",
                                                   categoryId: categories[0].id,
                                                   tag: "",
                                                   url: "",
                                                   img: "",
                                               }}
                                               onSubmitHandler={onCreateHandler}
                                               categoryItems={
                                                   [...categories].map(({id, name}) => ({value: id, label: name}))
                                               }
                                />
                            )
                        }
                    </Collapse>
                )
            }

            {
                items && itemsLocal && categories && (
                    <div className={style.items}>
                        {
                            [...itemsLocal]
                                .sort(sortOrderedItemByOrder)
                                .map(item => (
                                    <PortfolioItem key={item.id}
                                                   item={item}
                                                   replaceItems={replaceItems}
                                                   items={items}
                                                   list={itemsLocal}
                                                   isLoadingItems={isFetching}
                                                   categoryItems={
                                                       [...categories].map(({id, name}) => ({value: id, label: name}))
                                                   }
                                    />
                                ))
                        }
                    </div>
                )
            }

        </div>
    )
})
