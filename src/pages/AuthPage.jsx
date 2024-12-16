import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import styles from '../styles/AuthPage.module.css'
import { useAuth } from '../hooks/useAuth';


const AuthPage = () => {
  const [connect] = useAuth();

  return (
    <div className={styles.container}>
      <h1>Welcome to pokemons</h1>

      <button className={styles.loginButton} onClick={() => connect()}>
        Login with MetaMask
      </button>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default AuthPage;
