import React, { useState } from 'react';
import { Typography, FormControl, InputBase, Button } from '@material-ui/core';
import { marginGenerator, paddingGenerator } from '../../theme/utils';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/colors';
import { useHistory, Link } from 'react-router-dom';

import { singIn } from '../../operations/onBoarding';
import { Paths } from '../../routes/routePaths';
import Loader from '../../components/Loader';
import HeroImage from './components/HeroImage';
import { GenericErrorForm } from '../../operations/utils';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginInput: {
    backgroundColor: colors.common.white,
    fontSize: '16px',
    '& input': {
      padding: '19px 0 18px 0'
    },
    '& input::placeholder': {
      opacity: 1,
      color: colors.common.black
    }
  }
}));
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const emailHandler = evt => setEmail(evt.target.value);
  const passwordHandler = evt => setPassword(evt.target.value);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    await singIn({ email, password });
    setLoading(false);
    history.replace(Paths.Dashboard);
  };

  if (loading) return <Loader />;

  return (
    <div className={classes.root}>
      <HeroImage />
      <div style={{ position: 'relative', flex: 1 }}>
        <Link to={Paths.CreateAccount}>
          <Button
            style={{ position: 'absolute', right: '90px', top: '40px' }}
            disableElevation
            color="primary"
            variant="contained">
            Create Account
          </Button>
        </Link>
        <div
          style={{
            width: '460px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          }}>
          <div>
            <Typography
              style={{ fontWeight: 'normal', lineHeight: 1.5 }}
              variant="h1">
              Login to your account
            </Typography>
            <Typography
              style={{ fontWeight: 'normal', fontSize: '14px' }}
              variant="subtitle1">
              Please enter your login details
            </Typography>

            <FormControl
              style={{ width: '100%', ...marginGenerator(['mt-32']) }}
              variant="outlined">
              <InputBase
                onChange={evt => emailHandler(evt)}
                className={classes.loginInput}
                placeholder="Email Address *"
              />
            </FormControl>
            <FormControl
              style={{ width: '100%', ...marginGenerator(['mt-24']) }}
              variant="outlined">
              <InputBase
                className={classes.loginInput}
                type="password"
                placeholder="Password *"
                onChange={evt => passwordHandler(evt)}
              />
            </FormControl>

            <Button
              style={{
                width: '100%',
                fontSize: '16px',
                ...marginGenerator(['mt-32']),
                ...paddingGenerator(['pt-19', 'pb-18'])
              }}
              variant="contained"
              disableElevation
              onClick={async () => {
                if(!email || !password) {
                  GenericErrorForm();
                  return;
                }
                await handleLogin({ email, password })
              }}
              color="primary">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
