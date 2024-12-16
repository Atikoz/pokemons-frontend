import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publikRoutes } from '../router/index';
import { AuthContext } from '../context';

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route key={route.path} path={route.path} element={route.component} />
        )}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      :
      <Routes>
        {publikRoutes.map(route =>
          <Route key={route.path} path={route.path} element={route.component} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default AppRouter;
