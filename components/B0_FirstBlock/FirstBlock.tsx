import style from "./FirstBlock.module.scss";

const items = [
    {label: "Instagram"},
    {label: "Dribbble"},
    {label: "Twitter"},
    {label: "Telegram"},
    {label: "Telegram"},
]


export const FirstBlock = () => {
    return (
        <div className={style.firstBlock}>
            <div className={style.inner}>
                <div className={style.content}>

                    <div className={style.titleBlock}>
                        <h1 className={style.title}>
                            Taking <span>crypto</span> and <span>fintech</span> products to the next level
                        </h1>

                        <div className={style.right}>
                            <div>
                                <p>Kiev, Ukrainian Local</p>
                                <p>Local Time → 11:01 AM</p>
                            </div>
                            <div>
                                <p>
                                    Monday
                                </p>
                                <p>
                                    November 14, 2022
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={style.items}>
                        {
                            items.map(({label}, key) => (
                                <div key={key}
                                     className={style.item}
                                >
                                    {label}
                                </div>
                            ))
                        }
                    </div>


                </div>

                <div className={style.bottom}/>
            </div>
        </div>
    )
}
