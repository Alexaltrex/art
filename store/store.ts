import {action, makeObservable, observable} from "mobx";

export class Store {
    burgerMenu = false
    //popupForm = false

    constructor() {
        makeObservable(this, {
            burgerMenu: observable,
            //popupForm: observable,

            setBurgerMenu: action.bound,
            //setPopupForm: action.bound,
        })
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu
    }


    // setPopupForm(popupForm: boolean) {
    //     this.popupForm = popupForm
    // }


}
export const store = new Store()
