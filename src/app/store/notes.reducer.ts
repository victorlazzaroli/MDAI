import {Note} from "../shared/models/note.model";
import {createReducer, on} from "@ngrx/store";
import {NotesActions, NotesApiActions} from "./notes.actions";

export const initialState: ReadonlyArray<Note> = [];

function syncNoteReducer (_state: ReadonlyArray<Note>, {noteIds}:{noteIds: number[]}): Note[] {
    if (!Array.isArray(noteIds)) {
        return [..._state];
    }
    return  _state.map(note => {
    if (noteIds.includes(note.threeId)) {note.sync = true;}
    return note;
  }).slice()
}

function editNoteReducer(_state: ReadonlyArray<Note>, {notes}: { notes: Note[] }): Note[] {
    if (!Array.isArray(notes)) {
        return [..._state];
    }
    const items = notes.map((note, index) => ({
            id: note.threeId, index
        })
    );
    return _state.map(noteItem => {
        const found = items.find(item => item.id === noteItem.threeId)
        if (found) {
            return {
                ...notes[found.index]
            }
        }

        return noteItem
    }).slice();
}

export const notesReducer = createReducer(
    initialState,
    on(NotesApiActions.retrievedNoteList, (_state, {notes}) => notes),
    on(NotesApiActions.syncedNotes, syncNoteReducer),
    on(NotesActions.addNotes, (_state, {notes}) => [..._state, ...notes]),
    on(NotesActions.editNotes, editNoteReducer),
    on(NotesActions.removeNotes, (_state, {noteIds}) => _state.filter(elem => !noteIds.includes(elem.threeId)))
);

