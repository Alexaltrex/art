import {action, makeObservable, observable} from "mobx";

export class Store {
    burgerMenu = false
    preloader: boolean = false
    bottom: number = 0
    pageYOffset: number = 0
    scrollDown: boolean = true
    popupForm = false

    constructor() {
        makeObservable(this, {
            burgerMenu: observable,
            preloader: observable,
            bottom: observable,
            pageYOffset: observable,
            scrollDown: observable,
            popupForm: observable,

            setBurgerMenu: action.bound,
            setPreloader: action.bound,
            setBottom: action.bound,
            setPageYOffset: action.bound,
            setScrollDown: action.bound,
            setPopupForm: action.bound,
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

}

export const store = new Store()
