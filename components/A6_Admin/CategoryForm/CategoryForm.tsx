import {CategoryCreateType} from "../../../types/category.type";
import {FC} from "react";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import {FieldsetCustom} from "../../Y_admin/FieldsetCustom/FieldsetCustom";
import style from "./CategoryForm.module.scss";
import {FieldText} from "../../Y_admin/FieldText/FieldText";
import {Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface ICategoryForm {
    label: string
    initialValues: CategoryCreateType
    onSubmitHandler: (portfolioUpdateData: CategoryCreateType) => Promise<void>
}

export const CategoryForm: FC<ICategoryForm> = ({
                                                    label,
                                                    initialValues,
                                                    onSubmitHandler,
                                                }) => {
    const onSubmit = async (values: CategoryCreateType, formikHelpers: FormikHelpers<CategoryCreateType>) => {
        try {
            await onSubmitHandler(values);
        } catch (e: any) {
            console.log(e.message);
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    };

    const validate = (values: CategoryCreateType): FormikErrors<CategoryCreateType> => {
        const errors = {} as FormikErrors<CategoryCreateType>
        if (!values.name) {
            errors.name = "Required"
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
                                    className={style.categoryForm}
                    >
                        <Form className={style.form}>
                            <FieldText name="name"
                                       label="Name"
                                       size="small"
                                       placeholder="Enter name"
                                       className={style.field}
                                       fullWidth
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
