import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Route, Redirect } from 'react-router-dom';

import { Routes } from '../../constants';
import { verifyJWT } from '../../utils';

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isValid, setValidity] = useState(null);

  useEffect(() => {
    (async () => {
      //TODO: Add after backend is implemented
      // const jwt = window.localStorage.getItem('jwt');
      // if (!jwt) setValidity(false);
      // else setValidity(await verifyJWT(jwt));

      //TODO: Remove after backend is implemented
      setValidity(false)
    })();
  }, []);

  return isValid === null ? <LinearProgress /> : (
    <Route {...rest} render={(props) => (
      isValid
        ? <Redirect to={Routes.Submissions} />
        : <Component {...props} />
    )}
    />
  );
};

export { PublicRoute };
