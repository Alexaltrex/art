import style from "./Feedback.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import clsx from "clsx";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

export const Feedback = observer(() => {
    //const {ref, dark} = useScroll();
    const { setPopupForm } = useStore();

    return (
        <div className={clsx({
            [style.feedback]: true,
            //[style.feedback_white]: !dark,
        })}
             //ref={ref}
        >
            <div className={style.inner}>
                <TitleWrapper step="05" label="Feedback" black={false}/>
                <p className={style.title} data-aos="fade-up">
                    Want To Be Our Next <span>Success</span> Story?
                </p>
                <p className={style.description}>
                    Have an idea? Discuss your project with our team today! Lay down your requirements and venture into a successful partnership with Demyanchuk Art
                </p>

                <a href="https://t.me/Anatoliy099"
                   className={style.tgLink}
                   target="_blank"
                   rel="noreferrer nofollow noopener"

                >
                    <PrimaryButton label="Contact me by Telegram"
                                   white={true}
                                   className={style.submitBtn}

                    />
                </a>

            </div>
            <img src="/png/ring_mobile.png" alt="" className={style.ring_mobile}/>
            <img src="/png/ring_desktop.png" alt="" className={style.ring_desktop}/>
        </div>
    )
})
