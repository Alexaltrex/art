import {action, makeObservable, observable} from "mobx";

export class Store {
    burgerMenu = false
    preloader: boolean = true
    bottom: number = 0

    //popupForm = false

    constructor() {
        makeObservable(this, {
            burgerMenu: observable,
            preloader: observable,
            bottom: observable,
            //popupForm: observable,

            setBurgerMenu: action.bound,
            setPreloader: action.bound,
            setBottom: action.bound,
            //setPopupForm: action.bound,
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

    // setPopupForm(popupForm: boolean) {
    //     this.popupForm = popupForm
    // }


}

export const store = new Store()
