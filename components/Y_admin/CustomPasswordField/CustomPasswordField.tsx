import {useField} from "formik";
import React, {FC, ReactElement, useState} from "react";
import style from "./CustomPasswordField.module.scss"
import {TextField, TextFieldProps} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type CustomInputProps = {
    name: string
    icon?: ReactElement
} & TextFieldProps;

export const CustomPasswordField: FC<CustomInputProps> = ({
                                                              name,
                                                              icon,
                                                              ...props
                                                          }) => {
    const [
        inputProps,
        metaProps,
        //helperProps
    ] = useField(name);

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <div className={style.customPasswordField}>
            {
                icon &&
                <div className={style.iconWrapper}>
                    {icon}
                </div>
            }
            <TextField type={showPassword ? 'text' : 'password'}
                       id={inputProps.name}
                       name={inputProps.name}
                       helperText={metaProps.touched && metaProps.error}
                       value={inputProps.value}
                       onChange={inputProps.onChange}
                       onBlur={inputProps.onBlur}
                       error={metaProps.touched && Boolean(metaProps.error)}
                       {...props}
                       sx={{
                           position: 'relative',
                           '& .MuiFormHelperText-root': {
                               position: 'absolute',
                               transform: 'translate(0, 100%)',
                               left: 10,
                               bottom: -2
                           },
                           '& .MuiFormHelperText-contained': {
                               margin: 0
                           },
                           '& input': {
                               width: 'calc(100% - 60px)'
                           }
                       }}
            />
            <IconButton aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        size='small'
                        edge="end"
                        className={style.iconButton}
            >
                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
            </IconButton>
        </div>
    )
};



