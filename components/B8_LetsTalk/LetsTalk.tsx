import style from "./LetsTalk.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {FormikErrors, useFormik} from "formik";
import {TextField, ThemeProvider} from "@mui/material";
import clsx from "clsx";
import {theme} from "../../theme/theme";

interface IValues {
    name: string
    from: string
    idea?: string
    email: string
}

const budgets = [
    {label: "< $10k", value: 0},
    {label: "$10k — 25k", value: 1},
    {label: "$10k — 50k", value: 2},
    {label: "$50k+", value: 3},
];

const initialValues = {
    name: "",
    from: "",
    idea: "",
    email: "",
}

const fieldSx = {
    "& .MuiFormHelperText-root": {
        color: "darkred",
        position: "absolute",
        bottom: 0,
        left: 0,
        transform: "translateY(100%)",
        fontFamily: "Syne",
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "#000!important",
    },
    "& .MuiInputBase-root.Mui-focused": {
        "&::before": {
            borderBottom: "1px solid #000",
        }
    },
    "& .MuiInputBase-input": {
        fontFamily: "Syne",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "140%",

        "&::placeholder": {
            fontFamily: "Syne",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "140%",
        }
    }
}

export const LetsTalk = () => {
    const [budget, setBudget] = useState(0);

    const onSubmit = (
        values: IValues,
    ) => {
        console.log(values)
    }

    const validate = (values: IValues): FormikErrors<IValues> => {
        const errors = {} as FormikErrors<IValues>;
        if (!values.name) {
            errors.name = "required"
        }
        if (!values.from) {
            errors.from = "required"
        }
        if (!values.idea) {
            errors.idea = "required"
        }
        if (!values.email) {
            errors.email = "required"
        }
        return errors
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    const [color, setColor] = useState("#FFF");

    const ref = useRef<HTMLDivElement>(null!);
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                // console.log(rect.top)
                // console.log(window.innerHeight)
                //console.log("---")
                if (rect.top < window.innerHeight / 2) {
                    setDark(true);
                } else {
                    setDark(false);
                }
            }

        };
        window.addEventListener("scroll", onScroll, {passive: true})
    }, []);


    return (

        <div className={clsx({
            [style.letsTalk]: true,
            [style.letsTalk_dark]: dark,
        })}
             ref={ref}
        >
            <div className={style.inner}>
                <TitleWrapper step="07" label="Let's talk!"/>

                <p className={style.title}>
                    Hello, Demyanchuk Art studio!
                </p>

                <form onSubmit={formik.handleSubmit}
                      className={style.form}
                >
                    <div className={style.twoFields}>
                        <div className={style.fieldWrapper}>
                            <p className={style.label}>My name is</p>
                            <TextField label="Name"
                                       variant="standard"
                                       placeholder="Your name"
                                       {...formik.getFieldProps('name')}
                                       error={formik.touched.name && Boolean(formik.errors.name)}
                                       helperText={formik.touched.name && formik.errors.name}
                                       className={style.field}
                                       sx={fieldSx}
                                       color="info"
                            />
                        </div>
                        <div className={style.fieldWrapper}>
                            <p className={style.label}>from</p>
                            <TextField label="From"
                                       variant="standard"
                                       placeholder="Website or company name"
                                       {...formik.getFieldProps('from')}
                                       error={formik.touched.from && Boolean(formik.errors.from)}
                                       helperText={formik.touched.from && formik.errors.from}
                                       className={style.field}
                                       sx={fieldSx}
                            />
                        </div>
                    </div>

                    <TextField label="Project idea"
                               variant="standard"
                               placeholder="Pitch your project idea (optional)"
                               {...formik.getFieldProps('idea')}
                               error={formik.touched.idea && Boolean(formik.errors.idea)}
                               helperText={formik.touched.idea && formik.errors.idea}
                               className={style.ideaField}
                               sx={fieldSx}
                    />

                    <div className={style.budgetWrapper}>
                        <p className={style.label}>
                            A budget for this project is
                        </p>
                        <div className={style.buttons}>
                            {
                                budgets.map(({label, value}, key) => (
                                    <button key={key}
                                            className={clsx({
                                                [style.btn]: true,
                                                [style.btn_selected]: budget === value,
                                            })}
                                            onClick={() => setBudget(value)}
                                    >
                                        {label}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className={style.emailWrapper}>
                        <p className={style.label}>
                            Contact me back at
                        </p>
                        <TextField label="Email"
                                   variant="standard"
                                   placeholder="Your email"
                                   {...formik.getFieldProps('email')}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
                                   className={style.field}
                                   sx={fieldSx}
                        />
                    </div>

                    <button type="submit"
                            className={style.submitBtn}
                    >
                        <p>Submit</p>
                    </button>
                </form>

            </div>
        </div>
    )
}