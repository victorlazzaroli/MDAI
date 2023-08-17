import {createFeature, createFeatureSelector, createSelector} from "@ngrx/store";
import {Note} from "../shared/models/note.model";
import {ITreeItem} from "../atoms/tree-item/tree-item.component";


export const selectNotes = createFeatureSelector<ReadonlyArray<Note>>('notes');
export const selectNumOfNotes = createSelector(selectNotes, (notes) => {return notes?.length})
