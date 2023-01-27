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
