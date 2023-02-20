import {useField} from "formik";
import React, {FC} from "react";
import {SelectProps} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import clsx from "clsx";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface IMenuItem {
    value: string
    label: string
}

type FieldMultipleSelectType = {
    name: string
    menuItems: Array<IMenuItem>
    className?: string
} & SelectProps;

export const FieldSelect: FC<FieldMultipleSelectType> = ({
                                                                     name,
                                                                     menuItems,
                                                                     className,
                                                                     ...props
}) => {
    const [ field, meta, helpers ] = useField(name);

    return (
        <div className={clsx(Boolean(className) && className)}>
            <FormControl variant='outlined'
                         fullWidth={true}
                         size='small'
                         error={meta.touched && Boolean(meta.error)}
            >
                <InputLabel id={name}>{props.label}</InputLabel>
                <Select
                    name={field.name}
                    label={props.label}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    error={meta.touched && Boolean(meta.error)}
                    MenuProps={MenuProps}
                    //renderValue={(selected) => selected.join(', ')}
                >
                    {
                        menuItems
                            .map(el => (
                                <MenuItem key={el.value} value={el.value}>
                                    {el.label}
                                </MenuItem>
                            ))
                    }
                </Select>
                <FormHelperText>
                    {meta.touched && meta.error}
                </FormHelperText>
            </FormControl>
        </div>
    )
};
