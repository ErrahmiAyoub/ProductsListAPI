import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";



export default function CustomCardActions(props) {
    const { children, color, className, ...rest } = props
    const useStyles = makeStyles((theme) => ({
        root: {
            background: color,
            color: 'white',
            padding: '8px 16px',
            "&:hover": {
                background: color,
                filter: "brightness(130%)"
            }
        },
    }));
    const classes = useStyles();
    return (
        <Button
            className={classNames(classes.root, className)}
            variant="contained"
            {...rest}
        >
            {children}
        </Button>
    )
}
