import {Modal, TextField} from "@mui/material";
import {useStore} from "../../store/useStore";
import {observer} from "mobx-react-lite";
import Fade from "@mui/material/Fade";
import style from "./LetsTalkModal.module.scss";
import {useState} from "react";
import clsx from "clsx";
import {svgIcons} from "../../assets/svgIcons";
import {FormikErrors, useFormik} from "formik";
import * as React from "react";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {FormikHelpers} from "formik/dist/types";
import {mailAPI} from "../../api/mail.api";

interface IValues {
    name: string
    from: string
    email: string
    idea?: string
}

const initialValues = {
    name: "",
    from: "",
    email: "",
    idea: "",
}

const validate = (values: IValues): FormikErrors<IValues> => {
    const errors = {} as FormikErrors<IValues>;
    if (!values.name) {
        errors.name = "required"
    }
    if (!values.from) {
        errors.from = "required"
    }
    if (!values.email) {
        errors.email = "required"
    }
    return errors
}


export const LetsTalkModal = observer(() => {
    const {popupForm, setPopupForm} = useStore()
    const [form, setForm] = useState(true);

    const onSubmit = async (
        values: IValues
    ) => {
        try {
            //console.log(values);
            await mailAPI.sendEmail(values);
            setForm(false);
        } catch (e: any) {
            console.log(e.message);
        } finally {
            formik.resetForm();
        }

    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <Modal open={popupForm}
               onClose={() => setPopupForm(false)}

        >
            <Fade in={popupForm}>
                <div className={style.letsTalkModal}>
                    {
                        form ? (
                            <>
                                <p className={clsx({
                                    [style.title]: true,
                                    [style.title_form]: form,
                                })}>
                                    Let's talk!
                                </p>

                                <button className={style.closeBtn}
                                        onClick={() => setPopupForm(false)}
                                >
                                    {svgIcons.close}
                                </button>

                                <form onSubmit={formik.handleSubmit}
                                      className={style.form}
                                >
                                    <div className={style.twoFields}>

                                        <TextField label="Name"
                                                   variant="standard"
                                                   placeholder="Your name"
                                                   fullWidth
                                                   {...formik.getFieldProps('name')}
                                                   error={formik.touched.name && Boolean(formik.errors.name)}
                                                   helperText={formik.touched.name && formik.errors.name}
                                                   sx={fieldSx}
                                        />

                                        <TextField label="From"
                                                   variant="standard"
                                                   placeholder="Website or company name"
                                                   fullWidth
                                                   {...formik.getFieldProps('from')}
                                                   error={formik.touched.from && Boolean(formik.errors.from)}
                                                   helperText={formik.touched.from && formik.errors.from}
                                                   className={style.field}
                                                   sx={fieldSx}
                                        />
                                    </div>

                                    <TextField label="Email"
                                               variant="standard"
                                               placeholder="Your email"
                                               fullWidth
                                               {...formik.getFieldProps('email')}
                                               error={formik.touched.email && Boolean(formik.errors.email)}
                                               helperText={formik.touched.email && formik.errors.email}
                                               className={style.field}
                                               sx={fieldSx}
                                    />

                                    <div className={style.textareaField}>
                                       <textarea className={style.textarea}
                                                 {...formik.getFieldProps('idea')}
                                                 placeholder="Tell us more about your project"
                                       />

                                    </div>

                                    <PrimaryButton type="submit"
                                                   label="Send"
                                                   className={style.sendBtn}
                                                   white={false}

                                    />
                                </form>


                            </>
                        ) : (
                            <>
                                <p className={clsx({
                                    [style.title]: true,
                                    [style.title_form]: form,
                                })}>
                                    Congratulations!
                                </p>

                                <p className={style.description}>
                                    Your message was successfully delivered
                                </p>

                                <img src="/jpg/form.jpg" alt="" className={style.img}/>

                                <PrimaryButton label="Confirm"
                                               className={style.confirmBtn}
                                               white={false}
                                               onClick={() => {
                                                   setPopupForm(false);
                                                   setForm(true);
                                               }}

                                />
                            </>
                        )
                    }


                </div>
            </Fade>
        </Modal>
    )
})

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
        "&::after": {
            borderBottom: "2px solid #000",
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
        },
    }
}
