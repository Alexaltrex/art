interface IItemOrder {
    id: string
    order: number
}

export function replaceItemsInList<T extends IItemOrder> (
    id1: string,
    id2: string,
    items: T[]
): T[] {
    const result = [...items]
        .map(item => {
            if (item.id === id1) {
                // @ts-ignore
                const itemId2 = items.find(item => item.id === id2) as IPortfolioItem
                return ({...item, order: itemId2.order})
            }
            if (item.id === id2) {
                // @ts-ignore
                const itemId1 = items.find(item => item.id === id1) as IPortfolioItem
                // @ts-ignore
                return ({...item, order: itemId1.order})
            }
            return item
        });
    return result

}
