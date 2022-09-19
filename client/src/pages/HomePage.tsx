import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';
import Detail from '../components/Detail';
import Header from '../components/Header';
import Notes from '../components/Notes';

const HomePage: React.FC = () => {
    const user = useAppSelector(({ auth }) => auth.data);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="home">
            <Header />
            <main className="home-body">
                <Notes />
                <Routes>
                    <Route path="/note/:id" element={<Detail />} />
                </Routes>
            </main>
        </div>
    );
};

export default HomePage;
