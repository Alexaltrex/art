import style from "./Feedback.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {useScroll} from "../../hooks/useScroll";
import clsx from "clsx";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

export const Feedback = observer(() => {
    const {ref, dark} = useScroll();
    const {setPopupForm} = useStore();

    return (
        <div className={clsx({
            [style.feedback]: true,
            [style.feedback_white]: !dark,
        })}
             ref={ref}
        >
            <div className={style.inner}>
                <TitleWrapper step="04" label="Feedback" black={!dark}/>
                <p className={style.title} data-aos="fade-up">
                    A headline that is two lines long, <span>feedback</span>
                </p>
                <p className={style.description}>
                    Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.
                </p>

                <PrimaryButton label="Submit"
                               white={false}
                               className={style.submitBtn}
                               onClick={() => setPopupForm(true)}
                />

                {/*<button className={style.submitBtn}>*/}
                {/*    Submit*/}
                {/*</button>*/}

            </div>
            <img src="/png/ring_mobile.png" alt="" className={style.ring_mobile}/>
            <img src="/png/ring_desktop.png" alt="" className={style.ring_desktop}/>
        </div>
    )
})
