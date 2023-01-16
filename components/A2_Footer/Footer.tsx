import style from "./Footer.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {useMediaQuery} from "@mui/material";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";

const socials = [
    {
        label: "Email:",
        linkLabel: "demyanchukart@gmail.com",
        href: "#",
    },
    {
        label: "Telegram:",
        linkLabel: "Anatoliy099",
        href: "#",
    },
    {
        label: "Instagram:",
        linkLabel: "demyanchukart@gmail.com",
        href: "#",
    },
]

const getPercent = (b: number, h: number) => {

}


export const Footer = observer(() => {
    const {bottom} = useStore();
    const desktop = useMediaQuery('(min-width:1400px)');
    const height_footer = desktop ? 893 : 660;

    //console.log(bottom / height_footer)


    return (
        <footer className={style.footer}>
            <div className={style.wrapper}>
                <div className={style.top}>
                    <div className={style.inner}>

                        <div className={style.nameWrapper}
                             style={{
                                 transform: `translateX(${
                                     bottom > height_footer
                                         ? -100
                                         : -100 * bottom / height_footer
                                 }%)`,
                             }}
                        >
                            <p className={style.name}>Demyanchuk</p>
                            <p className={style.name}>ART</p>
                        </div>

                        <div className={style.socialWrapper}
                             style={{
                                 transform: `translateX(${
                                     bottom > height_footer
                                         ? 100
                                         : 100 * bottom / height_footer
                                 }%)`,
                             }}
                        >

                            <div className={style.socials}>
                                {
                                    socials.map(({label, linkLabel, href}, key) => (
                                        <div className={style.row} key={key}>
                                            <p className={style.label}>
                                                {label}
                                            </p>
                                            <a href={href}
                                               className={style.link}
                                               target="_blank"
                                               rel="nofollow noopener noreferrer"
                                            >
                                                {linkLabel}
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>

                            <p className={style.name}>ART</p>
                        </div>

                        <PrimaryButton label="Let's talk!"
                                       className={style.talkBtn}
                                       style={{
                                           transform: `translateX(${
                                               bottom > height_footer
                                                   ? -100
                                                   : -100 * bottom / height_footer
                                           }%)`,
                                       }}
                        />

                        {/*<button className={style.talkBtn}*/}
                        {/*        */}
                        {/*>*/}
                        {/*    Let's talk!*/}
                        {/*</button>*/}
                    </div>
                </div>

                <div className={style.bottom}
                     style={{
                         transform: `translateY(${
                             bottom > height_footer
                                 ? 100
                                 : 100 * bottom / height_footer
                         }%)`,
                     }}
                >
                    <div className={style.inner}>
                        <p className={style.first}>© Demyanchuk Art All rights reserved</p>

                        <div className={style.second}>
                            <p>Privacy Policy</p>
                            <p>Terms & Conditions</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
})
