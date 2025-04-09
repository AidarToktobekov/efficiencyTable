import {
    Box,
    Button, Collapse,
    Container,
    Grid, IconButton,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Typography
} from "@mui/material";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {getRegionEfficiency} from "../../features/efficiency/efficiencyThunk.js";
import {selectRegionEfficiency, selectRegionEfficiencyLoading} from "../../features/efficiency/efficiencySlice.js";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Efficiency = ()=>{

    const dispatch = useAppDispatch();
    const regionEfficiency = useAppSelector(selectRegionEfficiency);
    const loading = useAppSelector(selectRegionEfficiencyLoading);

    const [dates, setDates] = useState({
        createdAt: null,
        finishedAt: null,
    });

    const handleDateChange = (e)=>{
        const {value, name} = e.target;
        setDates((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const searchEfficiency = (e)=>{
        e.preventDefault();
        try {
            dispatch(getRegionEfficiency(dates));
        }catch(e){
            console.log(e);
        }
    }
    const [open, setOpen] = useState(false);

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"}>
                    <Grid container component={"form"} onSubmit={searchEfficiency}>
                        <TextField required type={"date"} name="createdAt" onChange={handleDateChange}></TextField>
                        <TextField required type={"date"} name="finishedAt" onChange={handleDateChange}></TextField>
                        <Button loading={loading} variant="contained" color="secondary" type="submit">
                            Поиск
                        </Button>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                        Регионы
                                    </TableCell>
                                    <TableCell>
                                        Квадраты
                                    </TableCell>
                                    <TableCell>
                                        Стройка
                                    </TableCell>
                                    <TableCell>
                                        Подключение
                                    </TableCell>
                                    <TableCell>
                                        Продажи
                                    </TableCell>
                                    <TableCell>
                                        Сумма баллов
                                    </TableCell>
                                    <TableCell>
                                        Эф-ть в %
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {regionEfficiency.map((efficiency, i) => (
                                    <>
                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setOpen(!open)}
                                                >
                                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {efficiency.region}
                                            </TableCell>
                                            <TableCell align="right">
                                                {efficiency.square}
                                            </TableCell>
                                            <TableCell align="right">
                                                {efficiency.build}
                                            </TableCell>
                                            <TableCell align="right">
                                                {efficiency.connection}
                                            </TableCell>
                                            <TableCell align="right">
                                                {efficiency.sale}
                                            </TableCell>
                                            <TableCell align="right">
                                                {efficiency.point}
                                            </TableCell>
                                            <TableCell align="right">
                                                {efficiency.efficiency}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            {efficiency.square}
                                                        </Typography>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                      </TableContainer>
                </Container>
            </Grid>
        </>
    );
};

export default Efficiency;