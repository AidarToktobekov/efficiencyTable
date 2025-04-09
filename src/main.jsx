import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {createTheme, ThemeProvider} from "@mui/material";
import {ruRU} from "@mui/material/locale";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.js";
import {addInterceptors} from "./axiosApi.js";

addInterceptors(store);

const theme = createTheme(
    {
        palette: {
            mode: 'light',
            background: {
                default: '#fff',
            },
        },
    },
    ruRU,
);

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
);