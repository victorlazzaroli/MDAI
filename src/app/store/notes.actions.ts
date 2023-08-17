import {createAction, createActionGroup, props} from "@ngrx/store";
import {Note} from "../shared/models/note.model";

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<{noteId: number, note: Note}>(),
    'Edit Note': props<{noteId: number, note: Note}>(),
    'Remove Note': props<{noteId: number}>(),
    'Sync Note': props<{noteId: number}>(),
  }
})

export const NotesApiActions = createActionGroup({
  source: 'Notes API',
  events: {
    'Retrieved Note List': props<{notes: ReadonlyArray<Note>}>(),
    'Synced Note': props<{noteId: number}>()
  }
})
