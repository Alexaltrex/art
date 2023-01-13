import {action, makeObservable, observable} from "mobx";

export class Store {
    burgerMenu = false
    preloader: boolean = true

    //popupForm = false

    constructor() {
        makeObservable(this, {
            burgerMenu: observable,
            preloader: observable,
            //popupForm: observable,

            setBurgerMenu: action.bound,
            setPreloader: action.bound,
            //setPopupForm: action.bound,
        })
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu
    }

    setPreloader(preloader: boolean) {
        this.preloader = preloader;
    }

    // setPopupForm(popupForm: boolean) {
    //     this.popupForm = popupForm
    // }


}

export const store = new Store()
