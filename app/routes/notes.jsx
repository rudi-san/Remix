import { json, redirect } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { getStoredNotes, storeNotes } from '~/data/notes';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';

export default function NotizenSeite() {
    const notes = useLoaderData();
   
    return (
    <main>
        <NewNote />
        <NoteList notes={notes} />
    </main>
    );
}

export async function loader () {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json({message: 'Keine Notizen vorhanden.'}, {status: 404, statusText: 'Nix gefunden'});
    }
    return notes; 
}

export async function action({request}) {
    const formData  = await request.formData();
    // const noteData  = {
    //     title:  formData.get('title'),
    //     content: formData.get('content')
    // };
    const noteData = Object.fromEntries(formData);

    if (noteData.title.trim().length < 5) {
        return {message: 'Titel muss länger als 4 Zeichen sein.'};
    }

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    //await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    return redirect('/notes');
}

export function links () {
    return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
    return {
        title: 'Alle Notizen',
        description: 'Verwalten von Notizen etc.'
    };
}

export function CatchBoundary() {
    const catchedResponse = useCatch();
    const message = catchedResponse.data?.message || 'Data not gefunden';

    return (
        <main>
            <NewNote />
            <p className='info-message'>{message}</p>
        </main>
    );
}

export function ErrorBoundary({error}) {
    return (
        <main className='error'>
          <h1>Ein Fehler isse aufgetreten</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safety!</Link></p>
        </main>
    )

}