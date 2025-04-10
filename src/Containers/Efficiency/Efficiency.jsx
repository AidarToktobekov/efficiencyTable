import {
    Box,
    Button, Collapse,
    Container,
    Grid, IconButton, ListItem,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Typography,
    List
} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {getRegionEfficiency} from "../../features/efficiency/efficiencyThunk.js";
import {selectRegionEfficiency, selectRegionEfficiencyLoading} from "../../features/efficiency/efficiencySlice.js";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ResponsivePie } from '@nivo/pie';
import Logo from "../../../public/logo.png";

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
                                    "& > th":{
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        fontFamily: 'Jura',
                                        fontWeight: 'bold',
                                    }
                                }}>
                                    <TableCell sx={{
                                        maxWidth: '90px',
                                    }}>
                                        <Grid sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <img src={Logo} style={{width: '100%'}} alt="logo"/>
                                        </Grid>
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
                                    <React.Fragment key={i}>
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
                                            <TableCell>
                                                {efficiency.square}
                                            </TableCell>
                                            <TableCell>
                                                {efficiency.build}
                                            </TableCell>
                                            <TableCell>
                                                {efficiency.connection}
                                            </TableCell>
                                            <TableCell>
                                                {efficiency.sale}
                                            </TableCell>
                                            <TableCell>
                                                {efficiency.point}
                                            </TableCell>
                                            <TableCell>
                                                {efficiency.efficiency}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{
                                                width: '100%',
                                                maxWidth: 'unset',
                                                paddingBottom: 0,
                                                paddingTop: 0
                                            }} colSpan={6}>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            {efficiency.square}
                                                        </Typography>
                                                        <Grid container justifyContent={"space-around"} sx={{
                                                            width: '100%',
                                                        }}>
                                                            <Grid sx={{
                                                                background: '#fff',
                                                                borderRadius: '15px',
                                                                p: 2,
                                                                fontSize: '20px',
                                                                fontFamily: 'Jura',
                                                                fontWeight: 'bold',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}>
                                                                <List>
                                                                    <ListItem>
                                                                        Title - {efficiency.pS}
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        Title - {efficiency.oneDay}
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        Title - {efficiency.week}
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        Title - {efficiency.TP}
                                                                    </ListItem>
                                                                </List>
                                                            </Grid>
                                                            <Grid sx={{
                                                                background: '#fff',
                                                                borderRadius: '15px',
                                                                p: 2,
                                                                fontSize: '20px',
                                                                fontFamily: 'Jura',
                                                                fontWeight: 'bold',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}>
                                                                <List>
                                                                    <ListItem>
                                                                        Title - {efficiency.pS}
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        Title - {efficiency.oneDay}
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        Title - {efficiency.week}
                                                                    </ListItem>
                                                                    <ListItem>
                                                                        Title -     {efficiency.TP}
                                                                    </ListItem>
                                                                </List>
                                                            </Grid>
                                                            <Grid sx={{
                                                                background: '#fff',
                                                                borderRadius: '15px',
                                                                width: '300px',
                                                                height: '300px'
                                                            }}>
                                                                <Typography variant="h6">
                                                                    Эффективность
                                                                </Typography>
                                                                <Grid>
                                                                    <ResponsivePie
                                                                            data={[
                                                                                {
                                                                                    id: "",
                                                                                    label: `${100 - efficiency.efficiency} %`,
                                                                                    value: 100 - efficiency.efficiency,
                                                                                    color: "#ff0000",
                                                                                    arcLinkLabel: ""
                                                                                },
                                                                                {
                                                                                    id: "Эффективность",
                                                                                    label: `${efficiency.efficiency} %`,
                                                                                    value: efficiency.efficiency,
                                                                                    color: "#00ff03",
                                                                                    arcLinkLabel: "Эффективность"
                                                                                }]}
                                                                        height={80}
                                                                        width={170}
                                                                        innerRadius={0.65}
                                                                        colors={['#1DBF12', '#E31A1A',]}
                                                                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                                                        enableSliceLabels={false}
                                                                        isInteractive={false}
                                                                        enableArcLabels={false}
                                                                        enableArcLinkLabels={false}
                                                                    />
                                                                    {/*<ResponsivePie*/}
                                                                    {/*    data={[*/}
                                                                    {/*        {*/}
                                                                    {/*            id: "",*/}
                                                                    {/*            label: `${100 - efficiency.efficiency} %`,*/}
                                                                    {/*            value: 100 - efficiency.efficiency,*/}
                                                                    {/*            color: "#ff0000",*/}
                                                                    {/*            arcLinkLabel: ""*/}
                                                                    {/*        },*/}
                                                                    {/*        {*/}
                                                                    {/*            id: "Эффективность",*/}
                                                                    {/*            label: `${efficiency.efficiency} %`,*/}
                                                                    {/*            value: efficiency.efficiency,*/}
                                                                    {/*            color: "#00ff03",*/}
                                                                    {/*            arcLinkLabel: "Эффективность"*/}
                                                                    {/*        }]}*/}
                                                                    {/*    height={80}*/}
                                                                    {/*    width={170}*/}
                                                                    {/*    innerRadius={0.65}*/}
                                                                    {/*    colors={['#1DBF12', '#E31A1A',]}*/}
                                                                    {/*    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}*/}
                                                                    {/*    // arcLabel={e=>`${e.value}%`}*/}
                                                                    {/*    enableSliceLabels={false}*/}
                                                                    {/*    isInteractive={false}*/}
                                                                    {/*    enableArcLinkLabels={false}*/}
                                                                    {/*/>*/}
                                                                {/*<ResponsivePie*/}
                                                                {/*    height={80}*/}
                                                                {/*    width={170}*/}
                                                                {/*    colors={{ datum: 'data.color' }}*/}
                                                                {/*    data={[*/}
                                                                {/*        {*/}
                                                                {/*            id: "",*/}
                                                                {/*            label: `${100 - efficiency.efficiency} %`,*/}
                                                                {/*            value: 100 - efficiency.efficiency,*/}
                                                                {/*            color: "#ff0000",*/}
                                                                {/*            arcLinkLabel: ""*/}
                                                                {/*        },*/}
                                                                {/*        {*/}
                                                                {/*            id: "Эффективность",*/}
                                                                {/*            label: `${efficiency.efficiency} %`,*/}
                                                                {/*            value: efficiency.efficiency,*/}
                                                                {/*            color: "#00ff03",*/}
                                                                {/*            arcLinkLabel: "Эффективность"*/}
                                                                {/*        }]}*/}
                                                                {/*    arcLabel={e=>`${e.value}%`}*/}
                                                                {/*    theme={{*/}
                                                                {/*        labels: {*/}
                                                                {/*            text: {*/}
                                                                {/*                fontSize: '14px',*/}
                                                                {/*                fill: '#000',*/}
                                                                {/*            }*/}
                                                                {/*        }*/}
                                                                {/*    }}*/}
                                                                {/*    defs={[*/}
                                                                {/*        {*/}
                                                                {/*            id: 'dots',*/}
                                                                {/*            type: 'patternDots',*/}
                                                                {/*            background: 'inherit',*/}
                                                                {/*            color: 'rgba(191,0,0,0.6)',*/}
                                                                {/*            size: 4,*/}
                                                                {/*            padding: 1,*/}
                                                                {/*            stagger: true*/}
                                                                {/*        },*/}
                                                                {/*        {*/}
                                                                {/*            id: 'lines',*/}
                                                                {/*            type: 'patternLines',*/}
                                                                {/*            background: 'inherit',*/}
                                                                {/*            color: 'rgba(20,133,0,0.28)',*/}
                                                                {/*            rotation: -45,*/}
                                                                {/*            lineWidth: 6,*/}
                                                                {/*            spacing: 10*/}
                                                                {/*        }*/}
                                                                {/*    ]}*/}
                                                                {/*    fill={[*/}
                                                                {/*        { match: { id: '' }, id: 'dots' },*/}
                                                                {/*        { match: { id: 'Эффективность' }, id: 'lines' }*/}
                                                                {/*    ]}*/}
                                                                {/*    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}*/}
                                                                {/*    innerRadius={0.5}*/}
                                                                {/*    padAngle={0.7}*/}
                                                                {/*    cornerRadius={3}*/}
                                                                {/*    activeOuterRadiusOffset={8}*/}
                                                                {/*    borderWidth={1}*/}
                                                                {/*    borderColor={{*/}
                                                                {/*        from: 'color',*/}
                                                                {/*        modifiers: [*/}
                                                                {/*            [*/}
                                                                {/*                'darker',*/}
                                                                {/*                0.2*/}
                                                                {/*            ]*/}
                                                                {/*        ]*/}
                                                                {/*    }}*/}
                                                                {/*    enableArcLinkLabels={false}*/}
                                                                {/*    legends={[*/}
                                                                {/*        {*/}
                                                                {/*            anchor: 'bottom',*/}
                                                                {/*            direction: 'row',*/}
                                                                {/*            justify: false,*/}
                                                                {/*            translateX: 0,*/}
                                                                {/*            translateY: 56,*/}
                                                                {/*            itemsSpacing: 0,*/}
                                                                {/*            itemWidth: 100,*/}
                                                                {/*            itemHeight: 18,*/}
                                                                {/*            itemTextColor: '#999',*/}
                                                                {/*            itemDirection: 'left-to-right',*/}
                                                                {/*            itemOpacity: 1,*/}
                                                                {/*            symbolSize: 18,*/}
                                                                {/*            symbolShape: 'circle',*/}
                                                                {/*            effects: [*/}
                                                                {/*                {*/}
                                                                {/*                    on: 'hover',*/}
                                                                {/*                    style: {*/}
                                                                {/*                        itemTextColor: '#000'*/}
                                                                {/*                    }*/}
                                                                {/*                }*/}
                                                                {/*            ]*/}
                                                                {/*        }*/}
                                                                {/*    ]}*/}
                                                                {/*    i*/}
                                                                {/*/>*/}
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
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