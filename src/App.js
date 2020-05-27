import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import muiTheme from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Routes from './routes';
import { auth } from './firebase';
import Loader from './components/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  async function onAuthStateChanged(user) {
    setUser(user);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    onAuthStateChanged();
    return subscriber;
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={muiTheme}>
        <Routes user={user} />
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

export default App;
