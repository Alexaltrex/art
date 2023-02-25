import style from "./TextBlock.module.scss";

export const TextBlock = () => {
    return (
        <div className={style.textBlock}>
            <div className={style.inner}>
                <h2 className={style.title}>
                    The brand is the <span>most important investment</span> you can make in <span>your business</span>
                </h2>
            </div>
        </div>
    )
}
