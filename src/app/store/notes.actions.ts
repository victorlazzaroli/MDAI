import {createAction, createActionGroup, props} from "@ngrx/store";
import {Note} from "../shared/models/note.model";

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<{noteId: string, note: Note}>(),
    'Edit Note': props<{noteId: string, note: Note}>(),
    'Copy To Note': props<{noteId: string, path: string[]}>(),
    'Move To Note': props<{noteId: string, path: string[]}>(),
    'Remove Note': props<{noteId: string}>(),
    'Sync Note': props<{noteId: string}>(),
    'Rename Note': props<{noteId: string, title: string}>()
  }
})

export const NotesApiActions = createActionGroup({
  source: 'Notes API',
  events: {
    'Retrieved Note List': props<{notes: ReadonlyArray<Note>}>(),
    'Synced Note': props<{noteId: string}>()
  }
})
