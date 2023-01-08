import style from "./Feedback.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";

export const Feedback = () => {
    return (
        <div className={style.feedback}>
            <div className={style.inner}>
                <TitleWrapper step="04" label="Feedback"/>
                <p className={style.title}>
                    A headline that is two lines long, <span>feedback</span>
                </p>
                <p className={style.description}>
                    Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.
                </p>
                <button className={style.submitBtn}>
                    Submit
                </button>
            </div>
            <img src="/png/ring_mobile.png" alt="" className={style.ring_mobile}/>
            <img src="/png/ring_desktop.png" alt="" className={style.ring_desktop}/>
        </div>
    )
}
