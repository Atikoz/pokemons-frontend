import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const [logout] = useLogout();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleApproveLogout = () => {
    logout();
    setOpen(false);
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  return (
    <div className={styles.header}>
      <Link to={'/home'}>Home</Link>
      <Link to={'/battleList'}>Battle List</Link>
      <Button onClick={handleLogout}>Exit</Button>

      <Dialog open={open} onClose={handleCancelLogout}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApproveLogout} color="primary">
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
