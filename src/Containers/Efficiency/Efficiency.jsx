import {
    Alert,
    Box,
    Button,
    Collapse,
    Container,
    Grid,
    IconButton,
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from "../../../public/logo.png";
import EfficiencyTableItem from "../../Components/EfficiencyTableItem/EfficiencyTableItem.jsx";
import SettingsIcon from '@mui/icons-material/Settings';

const Efficiency = ()=>{

    const dispatch = useAppDispatch();
    const {regionEfficiency, regionEfficiencyLoading, regionEfficiencyError} = useAppSelector(state => state.efficiency);
    const [hovered, setHovered] = useState(false);

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
                <Container maxWidth={"xl"}>
                    <Typography variant="h1" sx={{
                        textAlign: "center",
                        fontSize: '48px',
                        textTransform: 'uppercase',
                        fontFamily: 'Jura, sans-serif',
                        fontWeight: 'bold',
                        marginY: 3
                    }}>
                        Эффективность СИ по Хозяину сети
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
                        <Button loading={regionEfficiencyLoading} variant="contained" color="secondary" type="submit" sx={{
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
                                    <TableCell
                                        sx={{
                                            width: '120px',
                                            height: '100%',
                                        }}
                                    >
                                        <Grid
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{
                                                height: '100%',
                                                maxWidth: '90px',
                                                width: '100%',
                                            }}
                                        >
                                            <img
                                                src={Logo}
                                                alt="logo"
                                                style={{ display: "block", width: '90px', height: 'auto' }}
                                            />
                                        </Grid>
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ width: '100%' }}>
                                        Регионы
                                    </TableCell>
                                    <TableCell sx={{
                                        minWidth: '220px',
                                        p: '16px 10px',
                                    }}>
                                        <Grid sx={{
                                            ml: 'auto'
                                        }}>
                                            <Button
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                // onClick={handleMenu}
                                                color="secondary"
                                                variant={"contained"}
                                                onMouseEnter={()=>setHovered(true)}
                                                onMouseLeave={()=>setHovered(false)}
                                                sx={{
                                                    width: hovered ? "100%" : '44px',
                                                    height: '44px',
                                                    minWidth: '0',
                                                    p: "10px",
                                                    borderRadius: '22px',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'width 200ms ease',
                                                    marginLeft: 'auto',
                                                    gap: '5px',
                                                    '&:not(:hover)': {
                                                        transitionDelay: '200ms',
                                                    },
                                                }}
                                            >
                                                <Typography sx={{
                                                    color: hovered ? "inherit" : 'transparent',
                                                    transition: '200ms',
                                                    textWrap: 'nowrap',
                                                    transitionDelay: hovered ? "0ms" : '200ms'
                                                }}>
                                                    Настроить поля
                                                </Typography>
                                                <SettingsIcon sx={{
                                                    position: 'sticky',
                                                    right: '0',
                                                }}/>
                                            </Button>
                                            </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {regionEfficiencyError ?
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Alert variant="standard" severity="error" sx={{
                                                justifyContent: 'center',
                                            }}>
                                                {regionEfficiencyError.message ? regionEfficiencyError.message : null}
                                                {regionEfficiencyError.non_field_errors ? regionEfficiencyError.non_field_errors : null}
                                                {!regionEfficiencyError.message && !regionEfficiencyError.non_field_errors ? "Не известная ошибка!" : null}
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                    : null}
                                    {regionEfficiency.data.map((efficiency, i) => (
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
                                                                            Кол-во техподов
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
                                                                        <EfficiencyTableItem
                                                                            createdTechpods={square.data.created_techpods}
                                                                            daysCount={regionEfficiency.date}
                                                                            key={i}
                                                                            square={square.square}
                                                                            efficiencyPercentage={square.data.efficiency_percentage}
                                                                            works={square.data.works}
                                                                            oneDayNorm={square.data.one_day_norm}
                                                                            requestDaysNorm={square.data.request_days_norm}
                                                                            physicalForce={square.data.physical_force}
                                                                            pointsSum={square.data.points_sum}
                                                                        />
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