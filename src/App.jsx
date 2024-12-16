import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { AuthContext } from './context';
import AppRouter from './components/AppRouter';
import { INFURA_API_KEY } from './config.js'

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('auth')
    if (status === 'true') {
      setIsAuth(true)
    }
  }, [])


  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <MetaMaskProvider
          sdkOptions={{
            dappMetadata: {
              name: "Pokemons",
              url: window.location.href
            },
            infuraAPIKey: INFURA_API_KEY
          }}
        >
          <AppRouter />
        </MetaMaskProvider>
      </BrowserRouter>
    </AuthContext.Provider >
  );
}

export default App;
