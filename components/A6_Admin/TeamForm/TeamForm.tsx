import {FC} from "react";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import {UpdateMemberType} from "../../../types/member.type";
import {FieldsetCustom} from "../../Y_admin/FieldsetCustom/FieldsetCustom";
import style from "./TeamForm.module.scss";
import {FieldText} from "../../Y_admin/FieldText/FieldText";
import {FieldLoadImage} from "../../Y_admin/FieldLoadImage/FieldLoadImage";
import SaveIcon from "@mui/icons-material/Save";
import {Button} from "@mui/material";

interface ITeamForm {
    label: string
    initialValues: UpdateMemberType
    onSubmitHandler: (portfolioUpdateData: UpdateMemberType) => Promise<void>
}

export const TeamForm: FC<ITeamForm> = ({
                                            label,
                                            initialValues,
                                            onSubmitHandler,
                                        }) => {

    const onSubmit = async (values: UpdateMemberType, formikHelpers: FormikHelpers<UpdateMemberType>) => {
        try {
            console.log(values)
            await onSubmitHandler(values);
        } catch (e: any) {
            console.log(e.message);
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    };

    const validate = (values: UpdateMemberType): FormikErrors<UpdateMemberType> => {
        const errors = {} as FormikErrors<UpdateMemberType>
        if (!values.name) {
            errors.name = "Required"
        }
        if (!values.position) {
            errors.position = "Required"
        }
        if (!values.img) {
            errors.img = "Required"
        }
        return errors
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
                enableReinitialize={true}
        >
            {
                () => (
                    <FieldsetCustom label={label}
                                    className={style.teamForm}
                    >
                        <Form className={style.form}>
                            <FieldText name="name"
                                       label="Name"
                                       size="small"
                                       placeholder="Enter name"
                                       className={style.field}
                                       fullWidth
                            />
                            <FieldText name="position"
                                       label="Position"
                                       size="small"
                                       placeholder="Enter position"
                                       className={style.field}
                                       fullWidth
                            />
                            <FieldLoadImage name="img"
                                            label="Image"
                                            className={style.field}
                                            description=""
                            />
                            <Button type="submit"
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    startIcon={<SaveIcon/>}
                                    className={style.btn}
                            >
                                Save
                            </Button>
                        </Form>
                    </FieldsetCustom>
                )
            }
        </Formik>
    )
}
