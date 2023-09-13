import {action, makeObservable, observable} from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === 'undefined');

export class Store {
    burgerMenu = false
    preloader: boolean = false;
    bottom: number = 0
    pageYOffset: number = 0
    scrollDown: boolean = true
    popupForm = false
    model = false
    modelShift = false
    block2Height: null | number = null
    disableScroll = false

    deleteModal = false
    deleteId = "" // для сущности определяемой одним id и slideId для слада
    deleteSliderId = ""

    showPopup = true // BrandingOtherWorks


    constructor() {
        makeObservable(this, {
            burgerMenu: observable,
            preloader: observable,
            bottom: observable,
            pageYOffset: observable,
            scrollDown: observable,
            popupForm: observable,
            model: observable,
            modelShift: observable,
            block2Height: observable,
            disableScroll: observable,

            deleteModal: observable,
            deleteId: observable,
            deleteSliderId: observable,
            showPopup: observable,

            setBurgerMenu: action.bound,
            setPreloader: action.bound,
            setBottom: action.bound,
            setPageYOffset: action.bound,
            setScrollDown: action.bound,
            setPopupForm: action.bound,
            setModel: action.bound,
            setModelShift: action.bound,
            setBlock2Height: action.bound,
            setDisableScroll: action.bound,

            setDeleteModal: action.bound,
            setDeleteId: action.bound,
            setDeleteSliderId: action.bound,
            setShowPopup: action.bound,
        })
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu
    }

    setPreloader(preloader: boolean) {
        this.preloader = preloader;
    }

    setBottom(bottom: number) {
        this.bottom = bottom;
    }

    setPageYOffset(pageYOffset: number) {
        this.pageYOffset = pageYOffset;
    }

    setScrollDown(scrollDown: boolean) {
        this.scrollDown = scrollDown;
    }

    setPopupForm(popupForm: boolean) {
        this.popupForm = popupForm
    }

    setModel(model: boolean) {
        this.model = model
    }

    setModelShift(modelShift: boolean) {
        this.modelShift = modelShift
    }

    setBlock2Height(block2Height: number) {
        this.block2Height = block2Height
    }

    setDisableScroll(disableScroll: boolean) {
        this.disableScroll = disableScroll
    }

    setDeleteModal(deleteModal: boolean) {
        this.deleteModal = deleteModal
    }

    setDeleteId(deleteId: string) {
        this.deleteId = deleteId
    }

    setDeleteSliderId(deleteSliderId: string) {
        this.deleteSliderId = deleteSliderId
    }

    setShowPopup(showPopup: boolean) {
        this.showPopup = showPopup
    }
}

export const store = new Store()
