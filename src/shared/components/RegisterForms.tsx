import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { RegisterAsyncThunk } from '../../store/modules/UserSlice';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(RegisterAsyncThunk({ email, password, confirmPassword }));

    if (email.length < 10) {
      alert('Preencha o campo com um e-mail válido.');
      return;
    }

    if (password.length < 7) {
      alert('Crie uma senha com no mínimo 7 dígitos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas digitadas não são iguais.');
      return;
    }

    alert('Conta criada com sucesso.');

    navigate('/');
  };

  function logout() {
    navigate('/');
  }

  return (
    <div>
      <Button type="button" variant="contained" color="error" size="large" onClick={logout}>
        Voltar
      </Button>
      <Typography variant="h3" textAlign={'center'}>
        Crie sua conta!
      </Typography>
      <br />
      <br />
      <form onSubmit={handleSignUp}>
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
        <TextField
          fullWidth
          label="Repita a senha"
          type="password"
          value={confirmPassword}
          onChange={e => setconfirmPassword(e.target.value)}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="success" fullWidth>
          Criar conta
        </Button>
      </form>
    </div>
  );
};

export default Register;
