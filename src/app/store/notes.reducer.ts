import {Note} from "../shared/models/note.model";
import {createReducer, on} from "@ngrx/store";
import {NotesActions, NotesApiActions} from "./notes.actions";

export const initialState: ReadonlyArray<Note> = [];

function syncNoteReducer (_state: ReadonlyArray<Note>, {noteId}:{noteId: number}): Note[] {
 return  _state.map(note => {
    if (note.threeId === noteId) {note.sync = true;}
    return note;
  }).slice()
}

function editNoteReducer (_state: ReadonlyArray<Note>, {note}: {note: Note}): Note[] {
  if(!note){
    return [..._state];
  }

  return _state.map(noteItem => {
      console.log({noteItem, note})
    if (noteItem.threeId === note.threeId) {
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
    on(NotesActions.editNote, editNoteReducer),
    on(NotesActions.removeNote, (_state, {noteId}) => _state.filter(elem => elem.threeId !== noteId))
);

