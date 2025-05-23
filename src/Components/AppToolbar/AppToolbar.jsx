import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {logout, selectUser} from "../../features/user/userSlice.js";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/sign-in");
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <Container maxWidth={"xl"} sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <Typography sx={{
                                fontFamily: 'Jura',
                                fontSize: '24px'
                            }}>
                                {user?.username || ""}
                            </Typography>
                            <Button onClick={handleLogout} variant={"contained"} color="error">
                                Выйти
                            </Button>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default AppToolbar;