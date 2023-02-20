import style from "./LoginPage.module.scss";
import {getLocalStorage, setLocalStorage} from "../../localStorage/localStorage";
import { useRouter } from 'next/router';
import {ILoginData} from "../../types/auth.type";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps} from "formik";
import LockIcon from '@mui/icons-material/Lock';
import {CustomPasswordField} from "../../components/Y_admin/CustomPasswordField/CustomPasswordField";
import {Button} from "@mui/material";
import {useEffect} from "react";
import HomeIcon from '@mui/icons-material/Home';
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {authAPI} from "../../api/auth.api";

const LoginPage = observer(() => {
    const {setPreloader} = useStore();

    const router = useRouter();

    useEffect(() => {
        const accessToken = getLocalStorage();
        if (accessToken) {
            router.push("/admin");
        }
    }, []);

    const onHomeHandler = () => {
        setPreloader(false);
        router.push("/");
    }

    // form
    const initialValues: ILoginData = {
        password: ''
    };
    const validate = ({password}: ILoginData): FormikErrors<ILoginData> => {
        const errors: FormikErrors<ILoginData> = {};
        if (!password) {
            errors.password = "Required"
        }
        return errors
    }
    const onSubmitHandler = async (
        values: ILoginData,
        formikHelpers: FormikHelpers<ILoginData>
    ) => {
        try {
            console.log(values)
            const response = await authAPI.login(values);
            console.log(response);
            const accessToken = response.data.accessToken;
            setLocalStorage({accessToken});

            router.push("/admin");
        } catch (e: any) {
            console.log(e.message)
            if (e.response.data.message) {
                formikHelpers.setFieldError("password", e.response.data.message)
            }
            // setAlert({
            //     open: true,
            //     message: e.response?.data?.message || e.message,
            //     severity: "error"
            // })
        } finally {
            //setLoading(false);
            formikHelpers.setSubmitting(false);
        }
    };

    return (
        <div className={style.loginPage}>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmitHandler}
            >
                {
                    (props: FormikProps<ILoginData>) => (
                        <Form className={style.form}>
                            <Typography variant="h5"
                                        align="center"
                                        sx={{marginBottom: "36px"}}
                            >
                                Enter password
                            </Typography>
                            <CustomPasswordField name="password"
                                                 color='primary'
                                                 fullWidth
                                                 label="Password"
                                                 placeholder="Enter your password"
                                                 variant="outlined"
                                                 size="small"
                                                 icon={<LockIcon/>}
                            />
                            <Button type="submit"
                                    disabled={props.isSubmitting}
                                    color="primary"
                                    fullWidth
                                    variant="contained"
                                    className={style.submitBtn}
                            >
                                Login
                            </Button>
                            <Button color="success"
                                    variant="contained"
                                    fullWidth
                                    className={style.homeBtn}
                                    startIcon={<HomeIcon/>}
                                    onClick={onHomeHandler}
                            >
                                Home
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
})
export default LoginPage
