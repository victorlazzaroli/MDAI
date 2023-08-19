import { createFeatureSelector, createSelector} from "@ngrx/store";
import {Note} from "../shared/models/note.model";


export const selectNotes = createFeatureSelector<ReadonlyArray<Note>>('notes');
export const selectNumOfNotes = createSelector(selectNotes, (notes) => {return notes?.length})
