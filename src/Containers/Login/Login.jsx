import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  selectLoginError,
  selectLoginLoading,
} from '../../features/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../features/user/userThunk.js';
import {
  Alert,
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const Login = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const userMutation = {
        username: state.username.trim(),
        password: state.password.trim(),
      };

      await dispatch(login(userMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      component="form"
      maxWidth="none"
      onSubmit={submitFormHandler}
      sx={{
        maxWidth: '300px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 0 100px',
      }}
    >
      <Avatar
        sx={{
          bgcolor: deepPurple[500],
          m: '0 auto',
        }}
      ></Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          textAlign: 'center',
          pb: '20px',
        }}
      >
        Вход в систему
      </Typography>
      <Grid container justifyContent="flex-end">
        {error ? (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error?.message || error?.detail}
          </Alert>
        ) : null}
      </Grid>
      <TextField
        id="username"
        name="username"
        label="Имя пользователя"
        autoComplete="username"
        variant="outlined"
        value={state?.username}
        onChange={onChange}
        sx={{
          width: '100%',
          mt: 1,
        }}
      />
      <TextField
        id="password"
        type="password"
        name="password"
        autoComplete="current-password"
        label="Пароль"
        variant="outlined"
        value={state?.password}
        onChange={onChange}
        sx={{
          width: '100%',
          mt: 1,
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
        disabled={!state.username || !state.password}
        loading={loading}
      >
        Логин
      </Button>
    </Container>
  );
};

export default Login;
