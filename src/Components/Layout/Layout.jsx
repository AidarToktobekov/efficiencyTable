import {Container} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar.jsx";
import Footer from "../Footer/Footer.jsx";

const Layout = ({ children }) => {

    const onExcludedPage =
        location.pathname.includes("/sign-in");

    return(
        <>
            <header>
                {onExcludedPage ? <></> : <AppToolbar/>}
            </header>
            <Container
                maxWidth={false}
                component='main'
                disableGutters
                sx={{minHeight: "80vh"}}
            >
                {children}
            </Container>
            <footer><Footer/></footer>
        </>
    );
};

export default Layout;