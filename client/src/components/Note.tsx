import React from 'react';
import { useNavigate } from 'react-router-dom';

import { removeNote } from '../redux/actions/notes';
import { useAppDispatch } from '../redux/hooks';

interface NoteProps {
    _id: string;
    title: string;
    text: string;
    date: string;
}

const Note: React.FC<NoteProps> = ({ _id, title, text, date }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const removeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        dispatch(removeNote(_id));
    };

    return (
        <li className="note" onClick={() => navigate(`note/${_id}`)}>
            <div className="note-body">
                <div>
                    <div className="note-title">{title}</div>
                    <div className="note-text">{text}</div>
                </div>
                <span className="note-date">{new Date(date).toLocaleDateString()}</span>
                <div className="note-button">
                    <button onClick={removeHandler} className="note-remove">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 32 32">
                            <path d="M23 7h4v1h-2v18.993c0 1.671-1.343 3.007-3 3.007h-11c-1.666 0-3-1.346-3-3.007v-18.993h-2v-1h6v-1.995c0-1.111 0.894-2.005 1.997-2.005h5.005c1.102 0 1.997 0.898 1.997 2.005v1.995h2zM9 8v19.005c0 1.102 0.893 1.995 1.992 1.995h11.016c1.1 0 1.992-0.902 1.992-1.995v-19.005h-15zM12 10v17h1v-17h-1zM16 10v17h1v-17h-1zM20 10v17h1v-17h-1zM14.003 4c-0.554 0-1.003 0.443-1.003 0.999v2.001h7v-2.001c0-0.552-0.438-0.999-1.003-0.999h-4.994z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Note;
