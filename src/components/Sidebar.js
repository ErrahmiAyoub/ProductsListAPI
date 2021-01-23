import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { logout } from '../routes/utils'
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useStyles } from "../assets/jss/SidebarStyle"
import Navbar from './Navbar'



export default function MiniDrawer(props) {
    const { logo, image, routes, children } = props;
    const [open, setOpen] = React.useState(true);

    const location = useLocation();

    const hide = routes.filter((obj) => obj.path === location.pathname).length === 0

    console.log("hide", hide)

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        function handleResize() {
            if (window.outerWidth < 900) setOpen(false)
            else {
                setOpen(true)
            }

        }
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const backgroundStyle = makeStyles(() => ({
        backgroundimg: {
            backgroundImage: `url(${image})`,
        },
        background: {
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxShadow: image ? "inset 0 0 0 2000px rgb(255, 255, 255, 0.7)" : "none",
            background: "linear-gradient(180deg, rgba(239,248,248,1) 0%, rgba(180,223,231,1) 100%)"
        },
    }));

    const backClasses = backgroundStyle();
    const classes = useStyles();

    const links = (
        <List >
            {
                routes.map((prop, key) => {
                    return (
                        <NavLink
                            exact
                            className={classes.link}
                            to={prop.path}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#24709b",
                                background: "blue"
                            }}
                            activeClassName="active"
                            key={key}
                        >
                            <ListItem button >
                                {typeof prop.icon === "string" ? (
                                    <Icon                                >
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                        <prop.icon />
                                    )}
                                <ListItemText primary={prop.name} className={classes.linkText} />
                            </ListItem>
                        </NavLink>
                    );
                })
            }
        </List >
    );

    return (
        <>
            {hide ? <Redirect to="/404" /> : null}

            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                            [backClasses.backgroundimg]: image,
                        }, backClasses.background),
                    }
                    }
                >

                    <div className={classes.drawerHeader}>
                        {open &&
                            <div><img src={logo} alt="logo" style={{ width: "100%" }} /></div>
                        }
                        <IconButton aria-label="expand row" size="medium" onClick={() => setOpen(!open)} className={classes.icon}>
                            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                        <List>
                            {links}
                        </List>
                        <List>
                            <NavLink className={classes.link} to="/login" onClick={logout}>
                                <ListItem button>
                                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                    <ListItemText primary={"Déconnexion"} />
                                </ListItem>
                            </NavLink>
                        </List>
                    </div>

                </Drawer>

                <main className={clsx(classes.content, {
                    [classes.maxOpen]: open,
                    [classes.maxClose]: !open,
                })}>
                    <Navbar routes={routes} />
                    <Box m={2} height={1}>
                        {children}
                    </Box>
                </main>
            </div >

        </>
    );
}
