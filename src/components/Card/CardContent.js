import React from 'react'
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import classNames from "classnames";
import { Typography, Box } from '@material-ui/core';
import { useStyles } from '../../assets/jss/CardContentStyle'



export default function CustomCardContent(props) {
    const { children, icon, title, subtitle, footer, ...rest } = props;
    const classes = useStyles();
    const cardContentClasses = classNames({
        [classes.CardContent]: true,
        [classes.cardContenIcon]: icon,
        [classes.cardContenFooter]: footer,
    });
    return (
        <div className={cardContentClasses}>
            <CardContent {...rest}>
                <Paper className="paper" >
                    {icon &&
                        <Box>
                            <Typography variant="overline" className='title'>{title}</Typography>
                            <Typography variant="h5" className='subtitle'>{subtitle}</Typography>
                        </Box>
                    }
                    {children}
                    {footer &&
                        <Typography variant="caption" display="block" gutterBottom className="footer">{footer}</Typography>
                    }
                </Paper>
            </CardContent>

        </div>
    )
}
