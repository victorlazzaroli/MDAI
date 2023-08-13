import {Note} from "../shared/models/note.model";
import {createReducer, on} from "@ngrx/store";
import {NotesActions, NotesApiActions} from "./notes.actions";

export const initialState: ReadonlyArray<Note> = [];

function syncNoteReducer (_state: ReadonlyArray<Note>, {noteId}:{noteId: string}): Note[] {
 return  _state.map(note => {
    if (note.id === noteId) {note.sync = true;}
    return note;
  }).slice()
}

function editNoteReducer (_state: ReadonlyArray<Note>, {note}: {note: Note}): Note[] {
  if(!note){
    return [..._state];
  }

  return _state.map(noteItem => {
    if (noteItem.id === note.id) {
      return {
        ...note
      }
    }

    return noteItem
  }).slice();
}

export const notesReducer = createReducer(
  initialState,
  on(NotesApiActions.retrievedNoteList, (_state, {notes}) => notes),
  on(NotesApiActions.syncedNote, syncNoteReducer),
  on(NotesActions.addNote, (_state, {note}) => [..._state, note]),
  on(NotesActions.editNote, editNoteReducer)
);

