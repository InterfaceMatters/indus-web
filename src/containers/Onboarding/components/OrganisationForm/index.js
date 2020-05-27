import React, { useState } from 'react';
import { Typography, FormControl, InputBase, Button } from '@material-ui/core';
import { marginGenerator, paddingGenerator } from '../../../../theme/utils';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../../theme/colors';

import { Link, Redirect } from 'react-router-dom';

import {
  createOrganization,
  registerOrgAdmin
} from '../../../../operations/onBoarding';
import { Paths } from '../../../../routes/routePaths';
import HeroImage from '../HeroImage';
import { GenericErrorForm } from '../../../../operations/utils';

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

const OrganisationForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const emailHandler = evt => setEmail(evt.target.value);
  const passwordHandler = evt => setPassword(evt.target.value);

  const handleRegister = async ({ email, password, orgName }) => {
    try {
      const { id: orgId } = await createOrganization({ name: orgName });
      const { link } = await registerOrgAdmin({ email, password, orgId });
      if (link) {
        setEmailSent(true);
      }
    } catch (e) {
      console.log('ER', e);
    }
  };

  const [orgName, setOrgName] = useState('');

  if (emailSent === true) {
    return <Redirect to="/emailSent" />;
  }

  return (
    <div className={classes.root}>
      <HeroImage />
      <div style={{ position: 'relative', flex: 1 }}>
        <Link to={Paths.Login}>
          <Button
            style={{ position: 'absolute', right: '90px', top: '40px' }}
            disableElevation
            color="primary"
            variant="contained">
            Login
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
              Create an Account
            </Typography>
            <Typography
              style={{ fontWeight: 'normal', fontSize: '14px' }}
              variant="subtitle1">
              Please enter your Organisation details
            </Typography>

            <FormControl
              style={{ width: '100%', ...marginGenerator(['mt-24']) }}
              variant="outlined">
              <InputBase
                className={classes.loginInput}
                placeholder="Organisation name *"
                value={orgName}
                onChange={evt => setOrgName(evt.target.value)}
              />
            </FormControl>

            <FormControl
              style={{ width: '100%', ...marginGenerator(['mt-24']) }}
              variant="outlined">
              <InputBase
                value={email}
                className={classes.loginInput}
                placeholder="Email Address *"
                onChange={evt => emailHandler(evt)}
              />
            </FormControl>

            <FormControl
              style={{ width: '100%', ...marginGenerator(['mt-24']) }}
              variant="outlined">
              <InputBase
                className={classes.loginInput}
                value={password}
                onChange={evt => passwordHandler(evt)}
                type="password"
                placeholder="Password *"
              />
            </FormControl>

            <Button
              style={{
                width: '100%',
                fontSize: '16px',
                ...marginGenerator(['mt-32']),
                ...paddingGenerator(['pt-17', 'pb-16']),
                borderRadius: '2px'
              }}
              variant="contained"
              onClick={async () => {
                if(!password || !email || !orgName){
                  GenericErrorForm();
                  return;
                }
                await handleRegister({ email, password, orgName })
              }}
              disableElevation
              color="primary">
              Create account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationForm;
