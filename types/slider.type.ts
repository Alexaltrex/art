export interface ISlider {
    id: string // === category id
    category: string // не редактируется
    slides: ISlides
}

export interface ISlide {
    id: string
    order: number
    src: string
}

export interface ISlides {
    [slideId: string]: ISlide
}

export interface ICreateSlide {
    src: string | File
}
