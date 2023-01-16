import styles from "./PrimaryButton.module.scss";
import {FC, useState} from "react";
import clsx from "clsx";

interface IPrimaryButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    white?: boolean
    className?: string
    label: string
}

export const PrimaryButton: FC<IPrimaryButton> = ({
                                                      white = true,
                                                      className,
                                                      label,
                                                      ...props
                                                  }) => {
    const [mouseDown, setMouseDown] = useState(false)
    const onMouseDown = () => setMouseDown(true);
    const onMouseUp = () => setMouseDown(false);

    return (
        <button className={clsx(
            {
                [styles.primaryButton]: true,
                [styles.primaryButton_white]: white,
                [styles.primaryButton_dark]: !white,
                [styles.primaryButton_white_mouseDown]: white && mouseDown,
                [styles.primaryButton_dark_mouseDown]: !white && mouseDown,
            },
            Boolean(className) && className,
        )}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                {...props}
        >
            <p>{label}</p>
        </button>
    )
}
