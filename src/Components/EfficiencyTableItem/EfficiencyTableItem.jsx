import {
  Grid,
  List,
  ListItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import React, { memo, useEffect, useState } from 'react';

const NORM_BY_FORCE = {
  1: 3.5,
  2: 3.5,
  3: 5.5,
  4: 7,
  5: 9,
  6: 10.5,
  7: 12.5,
  8: 14,
};

const EfficiencyTableItem = ({
  tableCells,
  daysCount,
  square,
  works,
  physicalForce,
  oneDayNorm,
  requestDaysNorm,
  pointsSum,
  createdTechpods,
  consumables,
}) => {
  const [countSI, setCountSI] = useState(0);
  const [dayNorm, setDayNorm] = useState(0);
  const [daysNorm, setDaysNorm] = useState(0);
  const [consumablesPoints, setConsumablesPoints] = useState(0);
  const [efficiencyPercentage, setEfficiencyPercentage] = useState(0);

  useEffect(() => {}, [physicalForce]);

  useEffect(() => {
    setCountSI(physicalForce);
    setDayNorm(oneDayNorm);
    setDaysNorm(requestDaysNorm);
    if (!!Object.keys(consumables).length) {
      setConsumablesPoints(() => {
        const dropCable = consumables.drop_cable / 10;
        const adssCable = consumables.adss_cable / 6;
        const mainCoupling = consumables.main_coupling / 0.05;
        const subscriberCoupling = consumables.subscriber_coupling / 0.08;
        const connectNode = consumables.connect_node / 0.01;

        const consumablesPointsSum =
          dropCable +
          adssCable +
          mainCoupling +
          subscriberCoupling +
          connectNode;

        return Math.ceil((consumablesPointsSum / 5) * 0.035);
      });
    }
  }, [physicalForce, oneDayNorm, requestDaysNorm, consumablesPoints]);

  useEffect(() => {
    setDayNorm(NORM_BY_FORCE[countSI]);
    setDaysNorm(NORM_BY_FORCE[countSI] * daysCount);
  }, [countSI]);

  useEffect(() => {
    setEfficiencyPercentage(
      Math.ceil(((pointsSum + consumablesPoints) / daysNorm) * 100)
    );
  }, [pointsSum, daysNorm]);

  return (
    <TableRow>
      <TableCell
        align={'center'}
        sx={{
          border: '1px solid #ddd',
          fontFamily: 'Jura',
          fontWeight: '900',
          fontSize: '18px',
        }}
      >
        <Grid
          sx={{
            background: '#fff',
            borderRadius: '10px',
            p: 1,
          }}
        >
          {square}
        </Grid>
      </TableCell>
      {tableCells.workTypes && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
            fontFamily: 'Jura',
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          <Grid
            sx={{
              background: '#fff',
              borderRadius: '10px',
            }}
          >
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {works.map((work, i) => (
                <ListItem
                  key={i}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    height: '45px',
                    maxWidth: '230px',
                    '& > div': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  }}
                >
                  <Grid
                    sx={{
                      p: '0 5px',
                      flexGrow: '1',
                      fontSize: '14px',
                      height: '100%',
                      background: 'rgba(255,204,204,0.87)',
                      maxWidth: '140px',
                      width: 'max-content',
                      borderRadius: '5px 0 0 5px',
                    }}
                  >
                    {work.work_type}
                  </Grid>
                  <Grid
                    sx={{
                      minWidth: '40px',
                      height: '100%',
                      p: '0 5px',
                      borderRadius: '0 5px 5px 0',
                      background: 'rgba(217,204,255,0.87)',
                    }}
                  >
                    {work.amount}
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
        </TableCell>
      )}
      {tableCells.physicalForce && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
            fontFamily: 'Jura',
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          <Grid
            sx={{
              background: '#fff',
              borderRadius: '10px',
              p: 1,
            }}
          >
            <TextField
              type={'number'}
              inputProps={{
                min: 1,
                max: 8,
                sx: {
                  padding: '5px 10px',
                  width: '30px',
                },
              }}
              value={countSI}
              onChange={(e) => {
                setCountSI(e.target.value);
              }}
              sx={{
                p: 1,
              }}
            />
          </Grid>
        </TableCell>
      )}
      {tableCells.oneDayNorm && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
            fontFamily: 'Jura',
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          <Grid
            sx={{
              background: '#fff',
              borderRadius: '10px',
              p: 1,
            }}
          >
            {dayNorm}
          </Grid>
        </TableCell>
      )}
      {tableCells.requestDaysNorm && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
            fontFamily: 'Jura',
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          <Grid
            sx={{
              background: '#fff',
              borderRadius: '10px',
              p: 1,
            }}
          >
            {daysNorm}
          </Grid>
        </TableCell>
      )}
      {tableCells.createdTechpods && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
            fontFamily: 'Jura',
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          <Grid
            sx={{
              background: '#fff',
              borderRadius: '10px',
              p: 1,
            }}
          >
            {createdTechpods}
          </Grid>
        </TableCell>
      )}
      {tableCells.pointsSum && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
            fontFamily: 'Jura',
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          <Grid
            sx={{
              background: '#fff',
              borderRadius: '10px',
              p: 1,
            }}
          >
            {pointsSum + consumablesPoints}
          </Grid>
        </TableCell>
      )}
      {tableCells.efficiency && (
        <TableCell
          align={'center'}
          sx={{
            border: '1px solid #ddd',
          }}
        >
          <Grid
            sx={{
              width: '120px',
              height: '120px',
              background: '#fff',
              borderRadius: '10px',
              position: 'relative',
              margin: '0 auto',
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Jura',
                fontWeight: '900',
                fontSize: '18px',
                color:
                  efficiencyPercentage > 60
                    ? efficiencyPercentage > 80
                      ? efficiencyPercentage > 90
                        ? '#00b30f'
                        : '#ff8f00'
                      : '#efc700'
                    : '#ff0000',
              }}
            >
              {efficiencyPercentage}%
            </Typography>
            <ResponsivePie
              data={[
                {
                  id: 'green',
                  label: 'Эффективность',
                  value: efficiencyPercentage,
                },
                {
                  id: 'red',
                  label: '',
                  value: 100 - efficiencyPercentage,
                },
              ]}
              colors={['#1DBF12', '#E31A1A']}
              margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
              height={120}
              innerRadius={0.6}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              arcLabelsTextColor="#FFFFFF"
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
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: 'green',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'red',
                  },
                  id: 'lines',
                },
              ]}
            />
          </Grid>
        </TableCell>
      )}
    </TableRow>
  );
};

export default memo(EfficiencyTableItem);
