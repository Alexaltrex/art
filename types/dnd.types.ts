export const ItemType = {
    PortfolioItem: "PortfolioItem",
    MemberItem: "MemberItem",
    SlideItem: "SlideItem",
}

export interface IDragItem {
    order: number
    id: string
    type: string
}


