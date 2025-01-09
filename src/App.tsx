import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Login from './components/login/Login';
import Main from './components/main/Main';
import { RootState } from './redux/store';
import Footer from './components/main/Footer';

const App: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const footerText = `© ${new Date().getFullYear()} Websigni`;

    return (
        <div className="App">
            <div className="app-container">
                {isAuthenticated ? <Main /> : <Login />}
            </div>
            <Footer text={footerText} />
        </div>
    );
};

export default App;
