import {createAction, createActionGroup, props} from "@ngrx/store";
import {Note} from "../shared/models/note.model";

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<{noteId: number, note: Note}>(),
    'Edit Note': props<{noteId: number, note: Note}>(),
    'Copy To Note': props<{noteId: number, path: string[]}>(),
    'Move To Note': props<{noteId: number, path: string[]}>(),
    'Remove Note': props<{noteId: number}>(),
    'Sync Note': props<{noteId: number}>(),
    'Rename Note': props<{noteId: number, title: string}>()
  }
})

export const NotesApiActions = createActionGroup({
  source: 'Notes API',
  events: {
    'Retrieved Note List': props<{notes: ReadonlyArray<Note>}>(),
    'Synced Note': props<{noteId: number}>()
  }
})
