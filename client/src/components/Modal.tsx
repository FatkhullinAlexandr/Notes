import React from 'react';

import { useAppDispatch } from '../redux/hooks';
import { createNote } from '../redux/actions/notes';
import { AppContext } from '../App';

interface ModalProps {
    open: boolean;
    setOpen: (b: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen }) => {
    const dispatch = useAppDispatch();

    const [inputValues, setInputValues] = React.useState({ title: '', text: '' });
    const [disable, setDisable] = React.useState(false);
    const Context = React.useContext(AppContext);

    React.useEffect(() => {
        if (inputValues.title || inputValues.text) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [inputValues]);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, title: e.target.value });
    };

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValues({ ...inputValues, text: e.target.value });
    };

    const createHandler = async () => {
        const data = await dispatch<any>(createNote(inputValues));

        if (data.error) {
            Context?.setErrorMessage(data.payload);
            Context?.setWarningOpen(true);
            return;
        }

        setOpen(false);
        setInputValues({ title: '', text: '' });
    };

    const closeHandler = () => {
        setOpen(false);
        setInputValues({ title: '', text: '' });
    };

    return (
        <div className={`modal ${open ? 'active' : ''}`}>
            <div className="modal-body">
                <div className="modal-header">
                    <button onClick={closeHandler}>
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
                <div className="modal-input">
                    <input
                        onChange={onChangeTitle}
                        value={inputValues.title}
                        className="modal-input-item"
                        type="text"
                        name="title"
                    />
                    <label htmlFor="title">Заголовок</label>
                </div>
                <div className="modal-input">
                    <textarea
                        onChange={onChangeText}
                        value={inputValues.text}
                        className="modal-input-item"
                        rows={7}
                        name="text"
                    />
                    <label htmlFor="text">Текст</label>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={createHandler}
                        disabled={disable}
                        className="modal-button-create">
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
