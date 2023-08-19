import {createAction, createActionGroup, props} from "@ngrx/store";
import {Note} from "../shared/models/note.model";

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Notes': props<{notes: Note[]}>(),
    'Edit Notes': props<{notes: Note[]}>(),
    'Remove Notes': props<{noteIds: number[]}>(),
    'Sync Notes': props<{noteIds: number[]}>()
  }
})

export const NotesApiActions = createActionGroup({
  source: 'Notes API',
  events: {
    'Retrieved Note List': props<{notes: ReadonlyArray<Note>}>(),
    'Synced Notes': props<{noteIds: number[]}>()
  }
})
