import React from 'react'
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";



export default function CustomCardHeader(props) {

    let { title, subheader, color, icon, children, visibility } = props

    if (!color) color = "linear-gradient(90deg,rgba(116,186,237,1)  0%, rgba(25,81,114,1) 100%)"

    const useStyles = makeStyles((theme) => ({
        cardHeader: {
            display: "flex",
            zIndex: "10",
            "& .paper": {
                textAlign: 'left',
                background: color,
                position: "relative",
                padding: "20px 8px",
                zIndex: "15",
                width: "95%",
                margin: "auto",
            },
            "& .title": {
                color: '#fff',
            },
            subheader: {
                color: '#fff'
            },
        },
        cardHeaderIcon: {
            "& .paper": {
                width: "auto",
                padding: '16px',
                margin: "0",
                "& *": {
                    color: "#fff"
                }
            }
        },
        CardHeaderVisible: {
            "& .paper": {
                display: "flex",
                flexDirection: "space-between",
                flexWrap: 'wrap',
            }
        }
    }));
    const classes = useStyles();
    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes.cardHeaderIcon]: icon,
        [classes.CardHeaderVisible]: visibility,
    });


    return (
        <div className={cardHeaderClasses} >
            <Paper className="paper">
                {!icon && !visibility &&
                    <CardHeader
                        className="title"
                        title={title}
                        subheader={subheader}
                    />
                }
                {visibility ?
                    <Grid container>
                        <Grid item xs={10} >
                            <CardHeader
                                className="title"
                                title={title}
                                subheader={subheader}
                            />
                        </Grid>
                        <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end" }} >
                            {children}
                        </Grid>
                    </Grid>
                    : <div>{children}</div>
                }
            </Paper>
        </div>
    )
}
