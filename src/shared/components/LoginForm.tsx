import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LoginAsyncThunk } from '../../store/modules/UserSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.id) {
      navigate('/recados');
    }
  }, [user]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(LoginAsyncThunk({ email, password }));
  }

  return (
    <>
      <div>
        <Typography variant="h3" textAlign={'center'}>
          Bem-vindo ao sistema de recados !
        </Typography>

        <br />
        <br />
        <form onSubmit={handleLogin}>
          <TextField fullWidth label="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <br />
          <br />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" fullWidth type="submit">
            Entrar
          </Button>
          <br />
          <br />
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="success" fullWidth>
              Registrar
            </Button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
