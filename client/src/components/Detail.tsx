import React from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

import { INoteData } from '../models/models';
import { useAppDispatch } from '../redux/hooks';
import { updateNote } from '../redux/actions/notes';
import { AppContext } from '../App';

const Detail: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [inputValues, setInputValues] = React.useState({ title: '', text: '' });
    const Context = React.useContext(AppContext);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, title: e.target.value });
    };

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValues({ ...inputValues, text: e.target.value });
    };

    React.useEffect(() => {
        const fetchOneNote = async () => {
            try {
                const { data } = await axios.get<INoteData>(`/notes/${id}`);
                setInputValues({ title: data.title, text: data.text });
            } catch (error) {
                console.error(error);
            }
        };

        fetchOneNote();
    }, [id]);

    const updateHandler = async () => {
        if (id) {
            const params = {
                _id: id,
                ...inputValues,
            };

            const data = await dispatch<any>(updateNote(params));

            if (data.error) {
                Context?.setErrorMessage(data.payload);
                Context?.setWarningOpen(true);
            }

            navigate('/');
        }
    };

    return (
        <div className="detail">
            <div className="detail-body">
                <div className="detail-header">
                    <button onClick={() => navigate('/')}>
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
                        </svg>
                    </button>
                </div>
                <div className="detail-input">
                    <input
                        onChange={onChangeTitle}
                        value={inputValues.title}
                        className="detail-input-item"
                        type="text"
                        name="title"
                    />
                    <label htmlFor="title">Заголовок</label>
                </div>
                <div className="detail-input">
                    <textarea
                        onChange={onChangeText}
                        value={inputValues.text}
                        className="detail-input-item"
                        rows={7}
                        name="text"
                    />
                    <label htmlFor="text">Текст</label>
                </div>
                <div className="detail-footer">
                    <button onClick={updateHandler} className="detail-button-create">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Detail;
