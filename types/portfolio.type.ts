export interface IPortfolio {
    id: string
    order: number
    name: string
    year: string
    category: {
        id: string
        name: string
    }
    tag: string
    url: string
    img: string
}

export interface IPortfolioFormValues {
    name: string
    year: string
    categoryId: string
    tag: string
    url: string
    img: string | File
}

export interface IPortfolioUpdate {
    name: string
    year: string
    categoryId: string
    tag: string
    url: string
    img: string | File
}

export type ChangeItemsOrderType = {
    id: string
    order: number
}[]


