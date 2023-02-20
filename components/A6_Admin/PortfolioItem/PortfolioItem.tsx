import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import clsx from "clsx";
import {FC, useRef, useState} from "react";
import {IPortfolio, IPortfolioFormValues} from "../../../types/portfolio.type";
import style from "./PortfolioItem.module.scss"
import {useDrag, useDrop} from "react-dnd";
import type {Identifier, XYCoord} from 'dnd-core';
import {IDragItem, ItemType} from "../../../types/dnd.types";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import Typography from "@mui/material/Typography";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {portfolioAPI} from "../../../api/portfolio.api";
import CircularProgress from "@mui/material/CircularProgress";
import {PortfolioForm} from "../PortfolioForm/PortfolioForm";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";

interface PortfolioItem {
    item: IPortfolio
    items: IPortfolio[]
    list: IPortfolio[]
    replaceItems: (id1: string, id2: string) => void
    isLoadingItems: boolean
    categoryItems: {value: string, label: string}[]
}

export const PortfolioItem: FC<PortfolioItem> = observer(({
                                                              item: {
                                                                  id,
                                                                  order,
                                                                  name,
                                                                  year,
                                                                  category,
                                                                  tag,
                                                                  url,
                                                                  img
                                                              },
                                                              items,
                                                              list,
                                                              replaceItems,
                                                              isLoadingItems,
                                                              categoryItems
                                                          }) => {
    const {setDeleteModal, setDeleteId} = useStore();

    //========= CHANGE ITEMS ORDER =========//
    //const [changeItemsOrderMutator, {isLoading}] = useChangeItemsOrderMutation();
    const queryClient = useQueryClient();
    const changeItemsOrderMutation = useMutation({
        mutationFn: portfolioAPI.changeItemsOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['portfolios']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });

    //========= DRAG AND DROP =========//
    const ref = useRef<HTMLDivElement>(null);
    // карточка как цель перетаскивание
    const [{handlerId}, dropTargetRef] = useDrop<IDragItem,
        { id: string },
        { handlerId: Identifier | null }>({
        accept: ItemType.PortfolioItem,
        // обработчик накрытия цели источником
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragId = item.id;
            const hoveredId = id;
            const dragIndex = item.order; // индекс карточки, КОТОРАЯ перетаскивается и НАКРЫЛА другую карточку
            const hoveredIndex = order; // индекс карточки, которую накрыли
            if (dragIndex === hoveredIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // координата Y середины карточки-цели
            const hoverMiddleY = 0.5 * (hoverBoundingRect.bottom + hoverBoundingRect.top);
            // Координаты указателя мыши = положение источника перетаскивания
            const clientOffsetY = (monitor.getClientOffset() as XYCoord).y;

            // если карточку не перетащили за накрытую ею карточку
            if (
                (dragIndex < hoveredIndex && clientOffsetY < hoverMiddleY) ||
                (dragIndex > hoveredIndex && clientOffsetY > hoverMiddleY)
            ) {
                return
            }
            //console.log(id);
            replaceItems(dragId, hoveredId);
            item.order = hoveredIndex;
        },
        drop: (item, monitor) => {
            //console.log(item);
            //console.log(monitor)
            return ({id: id})
        },
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        })
    });
    // карточка как источник перетаскивания
    const [{isDragging}, dragSourceRef] = useDrag({
            type: ItemType.PortfolioItem,
            item: ({id, order}),
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
            end: async (item, monitor) => {
                // объект элемента с неизмененным значением order
                const item_initial = items.find(el => el.id === item.id);

                // если источник удачно брошен на цель  и место перещение - не изначальное место
                if (monitor.getDropResult() && item_initial && item_initial.order !== item.order) {
                    // console.log("changeOrder")
                    // changeOrder({id: item.id, order: item.order});
                    // console.log(list)
                    const changeItemsOrder = list.map(({id, order}) => ({id, order}));
                    await changeItemsOrderMutation.mutateAsync(changeItemsOrder);
                    //await changeItemsOrderMutator({changeItemsOrder}).unwrap();
                }
            }
        }
    )
    dragSourceRef(dropTargetRef(ref));

    //========= OPEN DELETE MODAL =========//
    const onShowDeleteModal = () => {
        setDeleteModal(true);
        setDeleteId(id);
    };

    //========= UPDATE PORTFOLIO =========//
    const [showForm, setShowForm] = useState(false);
    const onEditHandler = () => setShowForm(!showForm);
    const updateMutation = useMutation({
        mutationFn: portfolioAPI.update,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['portfolios']});
        },
        onError: (e: any) => {
            const message = e?.response?.data?.message ?? e.message;
            //dispatch(setSnackbar({open: true, message, severity: "error"}))
        }
    });
    const initialValues = {name, year, categoryId: category.id, tag, url, img}
    const onUpdateHandler = async (portfolioUpdateData: IPortfolioFormValues) => {
        await updateMutation.mutateAsync({id, portfolioUpdateData});
    }

    return (
        <div className={style.portfolioListItemWrapper}>
            <div className={clsx({
                [style.portfolioListItem]: true,
                [style.portfolioListItem_isDragging]: isDragging,
            })}
                 ref={ref}
            >
                <img src={img} alt="" className={style.img}/>

                <div className={style.nameWrapper}>
                    <Typography className={style.name}>{name}</Typography>
                    <div className={style.categoryWrapper}>
                        <Typography className={style.categoryLabel}>category:</Typography>
                        <Typography className={style.category}>{category.name}</Typography>
                    </div>

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
                    <PortfolioForm label="Update portfolio"
                                   initialValues={initialValues}
                                   onSubmitHandler={onUpdateHandler}
                                   categoryItems={categoryItems}
                    />
                </div>
            </Collapse>

        </div>
    )
})
