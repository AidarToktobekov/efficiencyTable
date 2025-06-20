import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Autocomplete,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  getRegionEfficiency,
  getSquares,
} from '../../features/efficiency/efficiencyThunk.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from '../../../public/logo.png';
import EfficiencyTableItem from '../../Components/EfficiencyTableItem/EfficiencyTableItem.jsx';
import SettingsIcon from '@mui/icons-material/Settings';
import HandymanIcon from '@mui/icons-material/Handyman';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PercentIcon from '@mui/icons-material/Percent';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import './efficiency.css';
import dayjs from 'dayjs';

const Efficiency = () => {
  const dispatch = useAppDispatch();
  const {
    regionEfficiency,
    regionEfficiencyLoading,
    regionEfficiencyError,
    squares,
    squaresLoading,
  } = useAppSelector((state) => state.efficiency);
  const [hovered, setHovered] = useState(false);
  const [dates, setDate] = useState([dayjs(new Date()), dayjs(new Date())]);
  const [square, setSquare] = useState(null);

  const [tableCells, setTableCells] = useState({
    workTypes: true,
    physicalForce: true,
    oneDayNorm: true,
    requestDaysNorm: true,
    createdTechpods: true,
    pointsSum: true,
    efficiency: true,
  });

  useEffect(() => {
    dispatch(getSquares());
  }, [dispatch]);

  const handleToggle = (name) => {
    setTableCells((prev) => ({
      ...prev,
      [name]: !tableCells[name],
    }));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSettingFields = Boolean(anchorEl);
  const id = openSettingFields ? 'simple-popover' : undefined;

  const searchEfficiency = (e) => {
    e.preventDefault();
    try {
      dispatch(getRegionEfficiency({ date: dates, square: square }));
    } catch (e) {
      console.log(e);
    }
  };
  const [open, setOpen] = useState({
    'Джалал-Абад': false,
    'Иссык-Куль': false,
    "Нарын": false,
    "Ош": false,
    "Талас": false,
    "Чуй": false,
  });

  return (
    <>
      <Grid>
        <Container maxWidth={'xl'}>
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: '48px',
              textTransform: 'uppercase',
              fontFamily: 'Jura, sans-serif',
              fontWeight: 'bold',
              marginY: 3,
            }}
          >
            Эффективность СИ по Хозяину сети
          </Typography>
          <Grid
            container
            component={'form'}
            onSubmit={searchEfficiency}
            justifyContent={'center'}
            sx={{
              margin: '20px auto',
            }}
            spacing={2}
          >
            <Box
              sx={{
                p: 2,
                flexGrow: 1,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  value={dates}
                  onChange={(value) => {
                    setDate(value);
                  }}
                  format="DD.MM.YYYY"
                  slotProps={{
                    textField: ({ position }) => ({
                      size: 'small',
                      fullWidth: true,
                      placeholder:
                        position === 'start' ? 'Start date' : 'End date',
                      sx: {
                        backgroundColor: '#f9f9f9',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid #ddd',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#888',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                      },
                    }),
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Autocomplete
              size="small"
              disablePortal
              options={squares}
              sx={{ width: 300, height: '72px' }}
              loading={squaresLoading}
              onChange={(e, value) => {
                setSquare(value.id);
              }}
              getOptionLabel={(item) => item.squares}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Квадрат"
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '72px',
                    },
                    '& label': {
                      marginTop: '14px',
                    },
                    '& label.Mui-focused': {
                      marginTop: '0',
                    },
                  }}
                />
              )}
            />

            <Button
              loading={regionEfficiencyLoading}
              variant="contained"
              color="secondary"
              type="submit"
              sx={{
                width: 'calc(10%)',
                fontSize: '18px',
              }}
            >
              Поиск
            </Button>
          </Grid>
          <TableContainer
            component={Paper}
            sx={{
              background: '#f3f3f3',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: '#727a93',
                    width: '100%',
                    '& > th': {
                      color: '#ffffff',
                      fontSize: '30px',
                      fontFamily: 'Jura',
                      fontWeight: 'bold',
                      border: 'none',
                      textAlign: 'center',
                    },
                  }}
                >
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
                        style={{
                          display: 'block',
                          width: '90px',
                          height: 'auto',
                        }}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell sx={{ width: '100%' }}>Регионы</TableCell>
                  <TableCell
                    sx={{
                      minWidth: '230px',
                      p: '16px 10px',
                    }}
                  >
                    <Grid
                      sx={{
                        ml: 'auto',
                      }}
                    >
                      <Button
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="primary"
                        variant={'text'}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        sx={{
                          width: hovered || anchorEl ? '100%' : '44px',
                          height: '44px',
                          minWidth: '0',
                          p: '10px',
                          borderRadius: '22px',
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'width 200ms ease, background 200ms ease',
                          marginLeft: 'auto',
                          gap: '5px',
                          background:
                            hovered || anchorEl ? '#fff' : 'transparent',
                          '&:not(:hover)': {
                            transitionDelay: '200ms',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Jura, sans-serif',
                            fontSize: '18px',
                            fontWeight: '900',
                            color: hovered || anchorEl ? '#000' : 'transparent',
                            transition: '200ms',
                            textWrap: 'nowrap',
                            transitionDelay:
                              hovered || anchorEl ? '0ms' : '200ms',
                          }}
                        >
                          Настроить поля
                        </Typography>
                        <SettingsIcon
                          sx={{
                            position: 'sticky',
                            right: '0',
                            fontSize: '30px',
                            color: hovered || anchorEl ? '#000' : '#fff',
                            transition: 'color 400ms ease',
                          }}
                        />
                      </Button>
                      <Popover
                        id={id}
                        open={openSettingFields}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        PaperProps={{
                          sx: {
                            background: '#f2f5fa',
                          },
                        }}
                      >
                        <List
                          sx={{
                            '&>li': {
                              borderBottom: '1px solid #ccc',
                            },
                          }}
                        >
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('workTypes')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.workTypes}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Типы работ'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <FormatListNumberedRtlIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.workTypes
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('physicalForce')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.physicalForce}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Физ силы'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <PeopleAltIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.physicalForce
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('oneDayNorm')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.oneDayNorm}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Норма дней'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <CheckIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.oneDayNorm
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('requestDaysNorm')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.requestDaysNorm}
                                  tabIndex={-1}
                                  disableRipple
                                  ч
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Норма за период'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <DoneAllIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.requestDaysNorm
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('createdTechpods')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.createdTechpods}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Кол-во техподов'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <HandymanIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.createdTechpods
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('pointsSum')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.pointsSum}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Сумма баллов'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <EqualizerIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.pointsSum
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle('efficiency')}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={tableCells.efficiency}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={'Эффективность'}
                                primaryTypographyProps={{
                                  fontSize: '20px',
                                  fontWeight: '900',
                                  fontFamily: 'Jura, sans-serif',
                                }}
                              />
                              <ListItemIcon
                                sx={{
                                  justifyContent: 'end',
                                }}
                              >
                                <PercentIcon
                                  sx={{
                                    fontSize: '30px',
                                    color: tableCells.efficiency
                                      ? '#008cff'
                                      : 'inherit',
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        </List>
                        <Grid container gap={1} p={1} justifyContent={'center'}>
                          <Button
                            color={'primary'}
                            variant={'contained'}
                            onClick={() => {
                              setTableCells({
                                workTypes: true,
                                physicalForce: true,
                                oneDayNorm: true,
                                requestDaysNorm: true,
                                createdTechpods: true,
                                pointsSum: true,
                                efficiency: true,
                              });
                            }}
                            sx={{
                              flexGrow: '2',
                            }}
                          >
                            <ChecklistIcon
                              sx={{
                                fontSize: '35px',
                              }}
                            />
                          </Button>
                          <Button
                            color={'error'}
                            variant={'contained'}
                            onClick={() => {
                              setTableCells({
                                workTypes: false,
                                physicalForce: false,
                                oneDayNorm: false,
                                requestDaysNorm: false,
                                createdTechpods: false,
                                pointsSum: false,
                                efficiency: false,
                              });
                            }}
                            sx={{
                              flexGrow: '2',
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                fontSize: '35px',
                              }}
                            />
                          </Button>
                        </Grid>
                      </Popover>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {regionEfficiencyError ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Alert
                        variant="standard"
                        severity={regionEfficiencyError.status}
                        sx={{
                          justifyContent: 'center',
                        }}
                      >
                        {regionEfficiencyError.message
                          ? regionEfficiencyError.message
                          : null}
                        {regionEfficiencyError.non_field_errors
                          ? regionEfficiencyError.non_field_errors
                          : null}
                        {!regionEfficiencyError.message &&
                        !regionEfficiencyError.non_field_errors
                          ? 'Неизвестная ошибка!'
                          : null}
                      </Alert>
                    </TableCell>
                  </TableRow>
                ) : null}
                {regionEfficiency.data.map((efficiency, i) => (
                  <React.Fragment key={i}>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell>
                        <Grid
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '122px',
                          }}
                        >
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                              setOpen((prevState) => ({
                                ...prevState,
                                [efficiency.region]: !open[efficiency.region],
                              }));
                            }}
                          >
                            {open[efficiency.region] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </Grid>
                      </TableCell>
                      <TableCell
                        colSpan={3}
                        component="th"
                        scope="row"
                        sx={{
                          width: '100%',
                          fontFamily: 'Jura',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {efficiency.region}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          width: '100%',
                          maxWidth: 'unset',
                          paddingBottom: 0,
                          paddingTop: 0,
                        }}
                        colSpan={100}
                      >
                        <Collapse
                          in={open[efficiency.region]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                m: 2,
                                fontFamily: 'Jura',
                                fontWeight: 'bold',
                                fontSize: '24px',
                              }}
                            >
                              Квадраты ({efficiency.region})
                            </Typography>
                            <TableContainer>
                              <Table
                                sx={{
                                  borderRadius: '5px',
                                  overflow: 'hidden',
                                }}
                              >
                                <TableHead
                                  sx={{
                                    background: '#d5d5d5',
                                  }}
                                >
                                  <TableRow
                                    sx={{
                                      '&>th': {
                                        fontFamily: 'jura',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        textAlign: 'center',
                                      },
                                    }}
                                  >
                                    <TableCell>Квадрат</TableCell>
                                    {tableCells.workTypes && (
                                      <TableCell>Типы работ</TableCell>
                                    )}
                                    {tableCells.physicalForce && (
                                      <TableCell>Физ силы</TableCell>
                                    )}
                                    {tableCells.oneDayNorm && (
                                      <TableCell>Норма дня</TableCell>
                                    )}
                                    {tableCells.requestDaysNorm && (
                                      <TableCell>
                                        Норма
                                        <Typography
                                          sx={{
                                            fontSize: '14px',
                                            minWidth: '100px',
                                            marginTop: '5px',
                                          }}
                                        >
                                          с: {dates[0].format('DD-MM-YYYY')}
                                          <br />
                                          по: {dates[1].format('DD-MM-YYYY')}
                                        </Typography>
                                      </TableCell>
                                    )}
                                    {tableCells.createdTechpods && (
                                      <TableCell>Кол-во техподов</TableCell>
                                    )}
                                    {tableCells.pointsSum && (
                                      <TableCell>Сумма баллов</TableCell>
                                    )}
                                    {tableCells.efficiency && (
                                      <TableCell>Эффективность</TableCell>
                                    )}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {efficiency.squares.map((square, i) => (
                                    <EfficiencyTableItem
                                      tableCells={tableCells}
                                      createdTechpods={
                                        square.data.created_techpods
                                      }
                                      daysCount={regionEfficiency.date}
                                      key={i}
                                      square={square.square}
                                      efficiencyPercentage={
                                        square.data.efficiency_percentage
                                      }
                                      works={square.data.works}
                                      oneDayNorm={square.data.one_day_norm}
                                      requestDaysNorm={
                                        square.data.request_days_norm
                                      }
                                      physicalForce={square.data.physical_force}
                                      pointsSum={square.data.points_sum}
                                      consumables={square.data.consumables}
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
