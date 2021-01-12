import React from 'react';
import { useAuth } from '../../hooks/AuthContext';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Dashboard
      <button type="button" onClick={() => signOut()}>
        LogOut
      </button>
    </div>
  );
};

export default Dashboard;
