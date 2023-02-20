import React, {FC, useState} from "react";
import {useField} from "formik";
import {useDropzone} from 'react-dropzone';
import style from "./FieldLoadImage.module.scss";
import BackupIcon from '@mui/icons-material/Backup';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import clsx from "clsx";
import {Typography} from "@mui/material";

interface IFieldLoadImage {
    name: string
    label: string
    className?: string
    description?: string
}


export const FieldLoadImage: FC<IFieldLoadImage> = ({
                                                        name,
                                                        label,
                                                        className,
                                                        description
                                                    }) => {
    const [inputProps, metaProps, helperProps] = useField(name);

    const [src, setSrc] = useState(inputProps.value);

    const onDropHandler = async (acceptedFiles: any) => {
        setSrc(URL.createObjectURL(acceptedFiles[0]));
        helperProps.setValue(acceptedFiles[0]);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: onDropHandler,
        multiple: false
    });

    let error = metaProps.touched && Boolean(metaProps.error);
    //console.log(metaProps.error)

    const onDeleteHandler = () => {
        setSrc('');
        helperProps.setValue('');
    };

    return (
        <div className={clsx(style.fieldLoadImage, Boolean(className) && className)}>
            <div className={style.imgWrapper}>
                {
                    src ? (
                            <img src={src}
                                 alt=""
                                 className={style.img}
                            />
                        )
                        : (
                            <DoNotDisturbAltIcon sx={{color: "#FFF", fontSize: "50px"}}/>
                        )
                }
            </div>

            <fieldset
                className={clsx({
                    [style.dropzone]: true,
                    [style.dropzone_active]: isDragActive,
                    [style.dropzone_accept]: isDragAccept,
                    [style.dropzone_reject]: isDragReject || error,
                })}
                {...getRootProps()}
            >
                <legend className={clsx({
                    [style.legend]: true,
                    [style.legend_error]: isDragReject || error,
                })}>
                    {label}
                </legend>

                <input
                    name={name}
                    //error={error}
                    {...getInputProps()}
                />

                <div className={style.dropzoneInner}>
                    <div className={style.left}>
                        <div className={style.leftTop}>
                            <BackupIcon/>
                            <Typography className={style.placeholder}>
                                Drag & drop here or click to select
                            </Typography>
                        </div>
                        {
                            description && (
                                <p className={style.description}>{description}</p>
                            )
                        }
                    </div>

                    {
                        metaProps.touched && Boolean(metaProps.error) && (
                            <Typography className={style.error}>
                                {metaProps.error}
                            </Typography>
                        )
                    }
                </div>
            </fieldset>

            <div className={clsx({
                [style.deleteBtn]: true,
                [style.deleteBtn_disable]: !Boolean(src),
            })}
                 onClick={onDeleteHandler}
            >
                <DeleteForeverIcon sx={{color: '#FFF', fontSize: "50px"}}/>
            </div>
        </div>
    )
}


