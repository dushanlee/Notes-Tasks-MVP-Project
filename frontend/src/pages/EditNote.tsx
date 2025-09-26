import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getNoteById, updateNote } from '../connections/noteApi';
import NoteForm from '../components/NoteForm';

export default function EditNote() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [note, setNote] = useState<Note | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getNoteById(Number(id)).then(data => {
                if (!data) setError("Couldn't load note");
                else setNote(data);
            });
        }
    }, [id]);

    async function handleSubmit(title: string, content: string) {
        if (!id) return;
        const updated = await updateNote(Number(id), { title, content });
        if (updated) navigate(`/notes/${id}`);
        else setError('Failed to update note');
    }

    if (error) return <p className="text-red-500">{error}</p>;
    if (!note) return <p>Loading...</p>;

    return (
        <div className="flex w-full h-full flex-1 bg-white rounded-xl">
            <div className="w-full space-y-6 px-4 md:px-8 border-2 border-black/10 dark:border-gray-700 rounded-xl shadow bg-white/70 dark:bg-gray-800 flex flex-col pt-8">
                <h1 className="text-2xl font-bold text-black dark:text-white text-center w-full mb-4">
                    Edit Note
                </h1>
                <NoteForm
                    initialTitle={note.title}
                    initialContent={note.content}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
