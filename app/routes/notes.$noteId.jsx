import { Link, useLoaderData } from "@remix-run/react";
import styles from '~/styles/note-details.css';
import { getStoredNotes } from '~/data/notes';
import { json } from "@remix-run/node";

export default function NotesDetailSeite () {
    const note = useLoaderData();
    return (
        <main id='note-details'>
            <header>
                <nav>
                    <Link to='/notes'>Zurück zur Übersicht</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    )
}

export async function loader({params}) {
    const notes = await getStoredNotes();
    const noteId = params.noteId;
    const noteRequested = notes.find(note => note.id === noteId);

    if (!noteRequested) {
        throw json({message: 'Es gibt keine Notiz mit der Id=' + noteId}, 
        {status: 404});
    }

    return noteRequested;
}

export function meta({data})  {
    return {
        title: data.title,
        description: data.content
    };
}

export function links() {
    return [{rel: 'stylesheet', href: styles}];
}