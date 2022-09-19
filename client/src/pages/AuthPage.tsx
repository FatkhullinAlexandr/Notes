import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { AppContext } from '../App';
import { fetchLogin, fetchRegister } from '../redux/actions/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Loader from '../components/Loader';

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data: userData, loading } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const [inputValues, setInputValues] = React.useState({ email: '', password: '' });
    const [dirty, setDirty] = React.useState({ email: false, password: false });
    const [errors, setErrors] = React.useState({ email: false, password: false });
    const [disable, setDisable] = React.useState(true);
    const Context = React.useContext(AppContext);

    const isRegister = location.pathname === '/register';

    React.useEffect(() => {
        setInputValues({ email: '', password: '' });
        setDirty({ email: false, password: false });
        setErrors({ email: false, password: false });
        setDisable(true);
    }, [isRegister]);

    React.useEffect(() => {
        if (inputValues.email && inputValues.password) {
            if (!errors.email && !errors.password) {
                setDisable(false);
            } else {
                setDisable(true);
            }
        }
    }, [inputValues, errors]);

    const onBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setDirty({ ...dirty, email: true });
                break;
            case 'password':
                setDirty({ ...dirty, password: true });
                break;
        }
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, email: e.target.value });

        const re =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setErrors({ ...errors, email: true });
        } else {
            setErrors({ ...errors, email: false });
        }
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, password: e.target.value });

        if (e.target.value.length < 5) {
            setErrors({ ...errors, password: true });
        } else {
            setErrors({ ...errors, password: false });
        }
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let data;

        if (isRegister) {
            data = await dispatch<any>(fetchRegister(inputValues));
        } else {
            data = await dispatch<any>(fetchLogin(inputValues));
        }

        if (data.payload.token) {
            localStorage.setItem('token', data.payload.token);
        }

        if (data.error) {
            Context?.setErrorMessage(data.payload);
            Context?.setWarningOpen(true);
        }
    };

    if (userData) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="auth">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h1 className="auth-title">
                            {isRegister ? 'Sign up' : 'Sign in'} to <span>Nooootess</span>
                        </h1>
                        <form className="auth-form">
                            <div className="auth-input">
                                {errors.email && dirty.email && (
                                    <p className="auth-form-error">Некорректный email</p>
                                )}
                                <input
                                    value={inputValues.email}
                                    onChange={onChangeEmail}
                                    onBlur={onBlurHandler}
                                    autoFocus
                                    type="text"
                                    name="email"
                                />
                                <label htmlFor="email">Email Adress</label>
                            </div>
                            <div className="auth-input">
                                {errors.password && dirty.password && (
                                    <p className="auth-form-error">
                                        Пароль должен быть не менее 5 символов
                                    </p>
                                )}
                                <input
                                    value={inputValues.password}
                                    onChange={onChangePassword}
                                    onBlur={onBlurHandler}
                                    type="password"
                                    name="password"
                                />
                                <label className="label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <button onClick={onSubmit} disabled={disable} className="auth-button">
                                SIGN UP
                            </button>
                        </form>
                        <p className="auth-question">
                            Already have an account?{' '}
                            <Link to={isRegister ? '/login' : '/register'}>
                                Sign {isRegister ? 'In' : 'Up'}
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default RegisterPage;
