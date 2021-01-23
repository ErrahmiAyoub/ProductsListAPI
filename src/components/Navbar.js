import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useLocation } from 'react-router-dom';
import { useStyles } from "../assets/jss/NavbarStyle"


export default function PrimarySearchAppBar(props) {
    const { routes } = props;
    const classes = useStyles();
    const location = useLocation();

    const route = routes.filter((obj) => {

        return obj.path === location.pathname;
    });



    return (

        <AppBar position="sticky" elevation={0}>
            <Toolbar className={classes.toolbar} >
                {route.length === 1 ? <Typography className={classes.title} variant="h6" noWrap>
                    {route[0].name}
                </Typography>
                    : null}
                <div className={classes.grow} />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>

            </Toolbar>
        </AppBar >



    );
}
