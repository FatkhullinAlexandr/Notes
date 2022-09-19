import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { fetchAuthMe } from './redux/actions/auth';
import { useAppDispatch } from './redux/hooks';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Warning from './components/Warning';

interface IContext {
    warningOpen: boolean;
    setWarningOpen: (open: boolean) => void;
    errorMessage: null | string;
    setErrorMessage: (error: string) => void;
}

export const AppContext = React.createContext<IContext | null>(null);

function App() {
    const dispatch = useAppDispatch();

    const [warningOpen, setWarningOpen] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <AppContext.Provider value={{ warningOpen, setWarningOpen, errorMessage, setErrorMessage }}>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<AuthPage />} />
                    <Route path="/*" element={<HomePage />} />
                </Routes>
                <Warning message={errorMessage} open={warningOpen} setOpen={setWarningOpen} />
            </div>
        </AppContext.Provider>
    );
}

export default App;
