import style from "./TitleWrapper.module.scss"
import {FC} from "react";
import clsx from "clsx";

interface ITitleWrapper {
    step: string
    label: string
    black?: boolean
}

export const TitleWrapper: FC<ITitleWrapper> = ({
                                                    step,
                                                    label,
                                                    black = true
                                                }) => {
    return (
        <div className={clsx({
            [style.titleWrapper]: true,
            [style.titleWrapper_white]: !black,
        })}>
            <h2 className={style.left}>
                <p>{step}</p>
                <p>{label}</p>
            </h2>
            <div className={style.right}/>
        </div>
    )
}
