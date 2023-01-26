import style from "./Preloader.module.scss"
import clsx from "clsx";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

const labels = [
    // "Demyanchuk",
    // "Art Studio",
    "Design",
    "Marketing",
    "Development",
    "Branding",
    "Production",
]

export const Preloader = observer(() => {
    const {setPreloader, model} = useStore();

    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(2);

    const [start, setStart] = useState(false);
    const [tik, setTik] = useState(0);

    //console.log(tik)

    useEffect(() => {
        setStart(true)
    }, [])

    useEffect(() => {
        if (start) {
            //console.log("start");
            setTimeout(() => {
                setTik(tik + 1);
            }, 1000)
        }
    }, [start]);

    useEffect(() => {
        //console.log("value")
        setTimeout(() => {
            if (tik < 4) {
                setTik(tik + 1);
            }
        }, 1000);
    }, [tik]);

    useEffect(() => {
        if (tik % 2 === 1) {
            setValue1(value1 + 2)
        }
        if (tik % 2 === 0 && tik !== 0) {
            setValue2(value2 + 2)
        }
        if (tik === 4) {
            setPreloader(false);
        }

    }, [tik]);

    return (
        <div className={clsx({
            [style.preloader]: true,
            [style.preloader_hide]: tik === 4 && model,
        })}>
            <div className={style.box}>
                <div className={clsx(style.inner, start && (tik < 6) && "preloader")}>
                    <div className={style.row}>
                        <p>{labels[value1 - 1]}</p>
                    </div>
                    <div className={style.row}>
                        <p>{labels[value2 - 1]}</p>

                    </div>
                </div>
            </div>
        </div>
    )
})
