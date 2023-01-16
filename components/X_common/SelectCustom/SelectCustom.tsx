import {FC} from "react";
import style from "./SelectCustom.module.scss"
import * as React from "react";
import {svgIcons} from "../../../assets/svgIcons";
import clsx from "clsx";
import {Popover} from "@mui/material";

interface IOption {
    value: string
    label: string
}

interface ISelectCustom {
    items: IOption[]
    name: string
    value: string
    onChange: any
    setFieldValue: any
    className?: string
}

export const SelectCustom: FC<ISelectCustom> = ({
                                                    items,
                                                    name,
                                                    value,
                                                    onChange,
                                                    setFieldValue,
                                                    className
                                                }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <>
            <button className={clsx({
                [style.selectCustom]: true,
            }, Boolean(className) && className)}
                 onClick={onClick}
            >
                <input type="text"
                       name={name}
                       value={value}
                       onChange={onChange}
                       className={style.input}
                />

                <div className={style.value}>
                    {value}
                </div>

                <div className={clsx({
                    [style.icon]: true,
                    [style.icon_open]: open,
                })}>
                    {svgIcons.arrow_down}
                </div>
            </button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    //backgroundColor: "green",
                    "& .MuiPaper-root": {
                        backgroundColor: "transparent",
                        borderRadius: "10px",
                        border: "1px solid #000000",
                        transform: "translateY(12px)!important"
                    }
                }}
            >
                <div className={style.list}>
                    {
                        items.map(({value: v, label}, key) => (
                            <div key={key}
                                 className={clsx({
                                     [style.item]: true,
                                     [style.item_selected]: v === value,
                                 })}
                                 onClick={() => {
                                     setFieldValue('brief', v);
                                     onClose();
                                 }}
                            >
                                {label}
                            </div>
                        ))
                    }
                </div>

            </Popover>
        </>

    )
}
