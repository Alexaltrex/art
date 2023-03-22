import style from "./Equalizer.module.scss";
import clsx from "clsx";
import {FC} from "react";

export const Equalizer: FC<{play: boolean}> = ({play}) => {
    return (
        <div className={style.equalizer}>
            {
                [0,1,2,3,4].map(key => (
                    <div key={key}
                         className={style.item}
                    >
                        <div className={clsx({
                            [style.itemInner]: play,
                            [style.itemInner_stop]: !play,
                        }, play && "equalizer")}
                             style={{
                                 animationDelay: `${key * 100}ms`
                             }}
                        >

                        </div>
                    </div>
                ))
            }

        </div>
    )
}
