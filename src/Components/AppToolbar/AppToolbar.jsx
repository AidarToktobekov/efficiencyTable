import {
    AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Link, Grid, ListItem, List
} from "@mui/material";
import { logout, selectUser } from "../../features/user/userSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick = (url) => {
        navigate(url);
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/sign-in");
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <Link href={"/"} sx={{
                            color: '#fff'
                        }}>
                            Efficiency
                        </Link>

                        <Grid sx={{
                            marginLeft: "auto",
                        }}>
                            <List sx={{
                                display: 'flex',
                                maxWidth: '350px',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <ListItem>
                                    <Link href={"/statistics"} sx={{
                                        color: '#fff',
                                    }}>
                                        Статистика
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={"/regions"} sx={{
                                        color: '#fff',
                                    }}>
                                        Регионы
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid sx={{
                            marginLeft: 'auto',
                            "@media(min-width: 600px)":{
                                display: 'none'
                            }
                        }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='inherit'
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleClick('/statistics')}>Новая карточка</MenuItem>
                                <MenuItem onClick={() => handleClick('/regions')}>Отчёты</MenuItem>
                            </Menu>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default AppToolbar;