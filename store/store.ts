import {action, makeObservable, observable} from "mobx";

export class Store {
    burgerMenu = false
    preloader: boolean = true;
    bottom: number = 0
    pageYOffset: number = 0
    scrollDown: boolean = true
    popupForm = false
    model = false
    modelShift = false
    block2Height: null | number = null
    disableScroll = false

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
}

export const store = new Store()
