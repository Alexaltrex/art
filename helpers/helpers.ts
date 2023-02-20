interface IGetValue {
    f1: number
    f2: number
    x2: number,
    x: number,
}

export const getValue = ({f1, f2, x2, x}: IGetValue): number => {
    //fx(x) = x * (f2 - f1) / x2 + f1
    if (x >= x2) {
        return f2
    } else {
        return x * (f2 - f1) / x2 + f1
    }
}

export function sortOrderedItemByOrder<T extends {order: number}>(itemA: T, itemB: T) {
    if (itemA.order > itemB.order) {
        return 1
    }
    if (itemA.order < itemB.order) {
        return -1
    }
    return 0
}

export const getFooterHeight = (isDesktop: boolean): number => {
    return isDesktop ? (window.innerWidth / 1400) * 990 : 1054
}
