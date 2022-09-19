import React from 'react';

import { AppContext } from '../App';
import { fetchNotes } from '../redux/actions/notes';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Modal from './Modal';
import Note from './Note';
import Search from './Search';

const Notes: React.FC = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector((state) => state.notes.items);

    const [createOpen, setCreateOpen] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const Context = React.useContext(AppContext);

    React.useEffect(() => {
        const fetch = async () => {
            try {
                const data = await dispatch<any>(fetchNotes());

                if (data.error) {
                    Context?.setErrorMessage(data.payload);
                    Context?.setWarningOpen(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, [dispatch, Context]);

    return (
        <div className="notes">
            <div className="notes-header">
                <Search value={search} setValue={setSearch} />
                <button onClick={() => setCreateOpen(true)} className="notes-add">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32">
                        <path d="M25 25h-3v-1h3v-3h1v3h3v1h-3v3h-1v-3zM20.022 28h-13.021c-1.105 0-2.001-0.902-2.001-2.001v-14.999h23v7.498c-0.77-0.321-1.614-0.498-2.5-0.498-3.59 0-6.5 2.91-6.5 6.5 0 1.289 0.375 2.49 1.022 3.5v0 0zM5 10v-2.999c0-1.105 0.902-2.001 2.001-2.001h18.998c1.105 0 2.001 0.902 2.001 2.001v2.999h-23zM25.5 30c3.038 0 5.5-2.462 5.5-5.5s-2.462-5.5-5.5-5.5c-3.038 0-5.5 2.462-5.5 5.5s2.462 5.5 5.5 5.5v0z"></path>
                    </svg>
                    <span>Добавить заметку</span>
                </button>
            </div>
            <ul className="notes-list">
                {notes.length ? (
                    notes
                        .filter((item) => {
                            return item.title.includes(search) || item.text.includes(search);
                        })
                        .map((item) => <Note {...item} key={item._id} />)
                ) : (
                    <div className="text">У вас пока нет заметок</div>
                )}
                {notes.length > 0 &&
                    notes.filter((item) => {
                        return item.title.includes(search) || item.text.includes(search);
                    }).length === 0 && <div className="text">Ничего не найдено</div>}
            </ul>
            <Modal open={createOpen} setOpen={setCreateOpen} />
        </div>
    );
};

export default Notes;
