import React from 'react'
import CardActions from '@material-ui/core/CardActions';
import { useStyles } from "../../assets/jss/CardActionsStyle"
export default function CustomCardActions(props) {
    const classes = useStyles();
    const { children } = props
    return (
        <div className={classes.divClass} >
            <CardActions className={classes.actions}>
                {children}
            </CardActions>
        </div>
    )
}
