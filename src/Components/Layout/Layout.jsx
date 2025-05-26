import { Container } from '@mui/material';
import AppToolbar from '../AppToolbar/AppToolbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <header>{pathname !== '/sign-in' && <AppToolbar />}</header>
      <Container
        maxWidth={false}
        component="main"
        disableGutters
        sx={{ minHeight: '80vh' }}
      >
        {children}
      </Container>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
