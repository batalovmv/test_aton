import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Login from './features/auth/Login';
import ClientList from './features/clients/ClientList';

const App: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <div className="App">
            {!isAuthenticated ? <Login /> : <ClientList />}
        </div>
    );
};

export default App;