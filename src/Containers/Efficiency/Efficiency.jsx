import {
    Box,
    Button,
    Collapse,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {getRegionEfficiency} from "../../features/efficiency/efficiencyThunk.js";
import {selectRegionEfficiency, selectRegionEfficiencyLoading} from "../../features/efficiency/efficiencySlice.js";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from "../../../public/logo.png";
import { ResponsivePie } from '@nivo/pie'

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
    const [open, setOpen] = useState({
        "Джалал-Абад": false,
        "Иссык-Куль": false,
        "Нарын": false,
        "Ош": false,
        "Талас": false,
        "Чуй": false,
    });

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"}>
                    <Typography variant="h1" sx={{
                        textAlign: "center",
                        fontSize: '48px',
                        textTransform: 'uppercase',
                        fontFamily: 'Jura, sans-serif',
                        fontWeight: 'bold',
                        marginY: 3
                    }}>
                        Эффективность
                    </Typography>
                    <Grid container component={"form"} onSubmit={searchEfficiency} justifyContent={"center"} sx={{
                            margin: "20px auto"
                    }} spacing={2}>
                        <TextField required type={"date"} name="createdAt" onChange={handleDateChange} sx={{
                            width: 'calc(45% - 16px)',
                        }}></TextField>
                        <TextField required type={"date"} name="finishedAt" onChange={handleDateChange} sx={{
                            width: 'calc(45% - 16px)',
                        }}></TextField>
                        <Button loading={loading} variant="contained" color="secondary" type="submit" sx={{
                            width: 'calc(10%)',
                            fontSize: '18px'
                        }}>
                            Поиск
                        </Button>
                    </Grid>
                    <TableContainer component={Paper} sx={{
                        background: '#f3f3f3'
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{
                                    background: '#727a93',
                                    width: '100%',
                                    "& > th":{
                                        color: '#ffffff',
                                        fontSize: '30px',
                                        fontFamily: 'Jura',
                                        fontWeight: 'bold',
                                        border: "none",
                                        textAlign: 'center'
                                    }
                                }}>
                                    <TableCell sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '120px',
                                        height: '100%',
                                    }}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{ height: '100%', maxWidth: '90px', width: '100%'}}
                                        >
                                            <img src={Logo} style={{ maxWidth: '100%', height: 'auto' }} alt="logo" />
                                        </Grid>
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ width: '100%' }}>
                                        Регионы
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {regionEfficiency.map((efficiency, i) => (
                                        <React.Fragment key={i}>
                                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <TableCell>
                                                    <Grid sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        width: '122px',
                                                    }}>
                                                        <IconButton
                                                            aria-label="expand row"
                                                            size="small"
                                                            onClick={() => {
                                                                setOpen(prevState => ({
                                                                    ...prevState,
                                                                    [efficiency.region]: !open[efficiency.region],
                                                                }))
                                                            }}
                                                        >
                                                            {open[efficiency.region] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                        </IconButton>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell colSpan={2} component="th" scope="row" sx={{ width: '100%', fontFamily: 'Jura', fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>
                                                    {efficiency.region}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{
                                                    width: '100%',
                                                    maxWidth: 'unset',
                                                    paddingBottom: 0,
                                                    paddingTop: 0
                                                }} colSpan={100}>
                                                    <Collapse in={open[efficiency.region]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h6" sx={{
                                                                m: 2,
                                                                fontFamily: 'Jura',
                                                                fontWeight: 'bold',
                                                                fontSize: '24px',
                                                            }}>
                                                                Квадраты ({efficiency.region})
                                                            </Typography>
                                                            <TableContainer>
                                                            <Table sx={{
                                                                borderRadius: '5px',
                                                                overflow: "hidden",
                                                            }}>
                                                                <TableHead sx={{
                                                                    background: "#d5d5d5",
                                                                }}>
                                                                    <TableRow sx={{
                                                                        "&>th":{
                                                                            fontFamily: 'jura',
                                                                            fontWeight: 'bold',
                                                                            fontSize: '20px',
                                                                            textAlign: 'center',
                                                                        }
                                                                    }}>
                                                                        <TableCell>
                                                                            Квадрат
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Типы работ
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Физ силы
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Норма дня
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Норма
                                                                            <Typography sx={{
                                                                                fontSize: "14px",
                                                                                minWidth: '100px',
                                                                                marginTop: '5px'
                                                                            }}>
                                                                            с: {dates.createdAt}<br/>по: {dates.finishedAt}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Сумма баллов
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Эффективность
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {efficiency.squares.map((square, i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                                fontFamily: 'Jura',
                                                                                fontWeight: '900',
                                                                                fontSize: '18px'
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    p: 1,
                                                                                }}>

                                                                                {square.square}
                                                                                </Grid>
                                                                            </TableCell>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                                fontFamily: 'Jura',
                                                                                fontWeight: '900',
                                                                                fontSize: '18px'
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    p: 1,
                                                                                }}>
                                                                                    <List>
                                                                                        {square.data.works.map((work, i)=>(
                                                                                            <ListItem key={i} sx={{
                                                                                                width: 'fit-content',
                                                                                                display: 'inline-block',
                                                                                                p: 0,
                                                                                            }}>
                                                                                                {work.work_type} - {work.amount}
                                                                                            </ListItem>
                                                                                        ))}
                                                                                    </List>
                                                                                </Grid>
                                                                            </TableCell>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                                fontFamily: 'Jura',
                                                                                fontWeight: '900',
                                                                                fontSize: '18px'
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    p: 1,
                                                                                }}>
                                                                                    {square.data.physical_force}
                                                                                </Grid>
                                                                            </TableCell>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                                fontFamily: 'Jura',
                                                                                fontWeight: '900',
                                                                                fontSize: '18px'
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    p: 1,
                                                                                }}>
                                                                                    {square.data.one_day_norm}
                                                                                </Grid>
                                                                            </TableCell>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                                fontFamily: 'Jura',
                                                                                fontWeight: '900',
                                                                                fontSize: '18px'
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    p: 1,
                                                                                }}>
                                                                                    {square.data.request_days_norm}
                                                                                </Grid>
                                                                            </TableCell>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                                fontFamily: 'Jura',
                                                                                fontWeight: '900',
                                                                                fontSize: '18px'
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    p: 1,
                                                                                }}>
                                                                                    {square.data.points_sum}
                                                                                </Grid>
                                                                            </TableCell>
                                                                            <TableCell align={"center"} sx={{
                                                                                border: '1px solid #ddd',
                                                                            }}>
                                                                                <Grid sx={{
                                                                                    width: '120px',
                                                                                    height: '120px',
                                                                                    background: '#fff',
                                                                                    borderRadius: '10px',
                                                                                    position: 'relative',
                                                                                    margin: "0 auto"
                                                                                }}>
                                                                                    <Typography sx={{
                                                                                        position: 'absolute',
                                                                                        left: '50%',
                                                                                        top: '50%',
                                                                                        transform: "translate(-50%, -50%)",
                                                                                        fontFamily: 'Jura',
                                                                                        fontWeight: '900',
                                                                                        fontSize: '18px',
                                                                                        color: square.data.efficiency_percentage > 60 ?
                                                                                            square.data.efficiency_percentage > 80 ?
                                                                                                square.data.efficiency_percentage > 90 ?
                                                                                                    "#00b30f" : "#ff8f00"
                                                                                                : "#efc700"
                                                                                            : '#ff0000',
                                                                                    }}>
                                                                                        {square.data.efficiency_percentage}%
                                                                                    </Typography>

                                                                                    <ResponsivePie
                                                                                        data={[
                                                                                            {
                                                                                                "id": "green", "label": "Эффективность", "value": square.data.efficiency_percentage,
                                                                                            }, {
                                                                                                "id": "red", "label": "", "value": 100 - square.data.efficiency_percentage,
                                                                                            },
                                                                                        ]}
                                                                                        colors={['#1DBF12', '#E31A1A']}
                                                                                        margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                                                                                        height={120}
                                                                                        innerRadius={0.6}
                                                                                        cornerRadius={3}
                                                                                        activeOuterRadiusOffset={8}
                                                                                        arcLabelsTextColor='#FFFFFF'
                                                                                        enableArcLabels={false}
                                                                                        enableArcLinkLabels={false}
                                                                                        tooltip={() => <div></div>}
                                                                                        defs={[
                                                                                            {
                                                                                                id: 'lines',
                                                                                                type: 'patternLines',
                                                                                                background: 'inherit',
                                                                                                color: 'rgba(255, 255, 255, 0.3)',
                                                                                                rotation: -45,
                                                                                                lineWidth: 6,
                                                                                                spacing: 10
                                                                                            }
                                                                                        ]}
                                                                                        fill={[
                                                                                            {
                                                                                                match: {
                                                                                                    id: 'green'
                                                                                                },
                                                                                                id: 'lines'
                                                                                            },
                                                                                            {
                                                                                                match: {
                                                                                                    id: 'red'
                                                                                                },
                                                                                                id: 'lines'
                                                                                            },
                                                                                        ]}
                                                                                    />
                                                                                </Grid>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
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