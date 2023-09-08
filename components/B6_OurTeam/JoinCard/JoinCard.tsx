import * as React from "react";
import style from "./JoinCard.module.scss";
import Lottie from 'react-lottie';
import smile from "../../../public/lottie/smile.json";

export const JoinCard = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: smile,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={style.joinCard}>
            <p className={style.title}>
                Join our team
            </p>
            <p className={style.description}>
                If you have something to say, please let us know!
            </p>

            <div className={style.smile}>
                <Lottie options={defaultOptions}
                        isStopped={false}
                        isPaused={false}
                />
            </div>

            <a href="mailto:demyanchukart@gmail.com"
               className={style.send}
            >
                <p>Send a message</p>
            </a>

        </div>
    )
}
