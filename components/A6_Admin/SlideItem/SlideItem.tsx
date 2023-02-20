import {FC, useRef} from "react";
import {ISlide} from "../../../types/slider.type";
import style from "./SlideItem.module.scss"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import {useStore} from "../../../store/useStore";
import {observer} from "mobx-react-lite";
import {useDrag, useDrop} from "react-dnd";
import {IDragItem, ItemType} from "../../../types/dnd.types";
import {Identifier, XYCoord} from "dnd-core";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {portfolioAPI} from "../../../api/portfolio.api";
import {sliderAPI} from "../../../api/slider.api";

interface ISlideItem {
    sliderId: string
    slide: ISlide
    items: ISlide[]
    list: ISlide[]
    replaceItems: (id1: string, id2: string) => void
}

export const SlideItem: FC<ISlideItem> = observer(({
                                                       sliderId,
                                                       slide: {id, src, order},
                                                       replaceItems,
                                                       items,
                                                       list
                                                   }) => {
    const {
        setDeleteModal,
        setDeleteId,
        setDeleteSliderId,
    } = useStore();

    //========= DELETE SLIDE FROM SLIDER =========//
    const onShowDeleteModal = () => {
        setDeleteModal(true);
        setDeleteId(id);
        setDeleteSliderId(sliderId);
    };

    //========= CHANGE ITEMS ORDER =========//
    const queryClient = useQueryClient();
    const changeItemsOrderMutation = useMutation({
        mutationFn: sliderAPI.changeItemsOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sliders']});
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
        accept: ItemType.SlideItem,
        // обработчик накрытия цели источником
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            console.log("hover")
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
            type: ItemType.SlideItem,
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
                    await changeItemsOrderMutation.mutateAsync({
                        sliderId,
                        changeItemsOrder
                    });
                    //await changeItemsOrderMutator({changeItemsOrder}).unwrap();
                }
            }
        }
    )
    dragSourceRef(dropTargetRef(ref));

    return (
        <div className={style.slideItem} ref={ref}>
            <img src={src} alt="" className={style.img}/>
            <Button variant="contained"
                    className={style.deleteButton}
                    startIcon={<DeleteForeverIcon sx={{fontSize: "32px!important"}}/>}
                    onClick={onShowDeleteModal}
                    sx={{fontSize: "16px"}}
            >
                Delete
            </Button>
        </div>
    )
})
