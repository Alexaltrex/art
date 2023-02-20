import {IPortfolioFormValues} from "../../../types/portfolio.type";
import {FC} from "react";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps} from "formik";
import style from "./PortfolioForm.module.scss";
import {FieldsetCustom} from "../../Y_admin/FieldsetCustom/FieldsetCustom";
import {FieldText} from "../../Y_admin/FieldText/FieldText";
import {FieldLoadImage} from "../../Y_admin/FieldLoadImage/FieldLoadImage";
import {Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {FieldSelect} from "../../Y_admin/FieldSelect/FieldSelect";

interface IPortfolioForm {
    label: string
    initialValues: IPortfolioFormValues
    onSubmitHandler: (portfolioUpdateData: IPortfolioFormValues) => Promise<void>
    categoryItems: {value: string, label: string}[]
}

export const PortfolioForm: FC<IPortfolioForm> = ({
                                                      label,
                                                      initialValues,
                                                      onSubmitHandler,
                                                      categoryItems
                                                  }) => {

    const onSubmit = async (values: IPortfolioFormValues, formikHelpers: FormikHelpers<IPortfolioFormValues>) => {
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

    const validate = (values: IPortfolioFormValues): FormikErrors<IPortfolioFormValues> => {
        const errors = {} as FormikErrors<IPortfolioFormValues>
        if (!values.name) {
            errors.name = "Required"
        }
        if (!values.year) {
            errors.year = "Required"
        }
        if (!values.tag) {
            errors.tag = "Required"
        }
        if (!values.url) {
            errors.url = "Required"
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
                                    className={style.portfolioForm}
                    >
                        <Form className={style.form}>
                            <FieldText name="name"
                                       label="Name"
                                       size="small"
                                       placeholder="Enter name"
                                       className={style.field}
                                       fullWidth
                            />

                            {
                                categoryItems && (
                                    <FieldSelect name="categoryId"
                                                 label={"Category"}
                                                 menuItems={categoryItems}
                                                 className={style.field}
                                    />
                                )
                            }

                            <FieldText name="year"
                                       label="Year"
                                       size="small"
                                       placeholder="Enter year"
                                       className={style.field}
                                       fullWidth
                            />
                            <FieldText name="tag"
                                       label="Tag"
                                       size="small"
                                       placeholder="Enter tag"
                                       className={style.field}
                                       fullWidth
                            />
                            <FieldText name="url"
                                       label="Url"
                                       size="small"
                                       placeholder="Enter url"
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
