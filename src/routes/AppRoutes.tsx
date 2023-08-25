import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Errants from '../pages/Errants';
import Home from '../pages/Home';
import SignUp from '../pages/Register';
import List from '../shared/components/Lista-Recados';
import Login from '../shared/components/LoginForm';
import Register from '../shared/components/RegisterForms';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home struture={Login} />} />
        <Route path="/signup" element={<SignUp struture={Register} />} />
        <Route path="/recados" element={<Errants struture={List} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
