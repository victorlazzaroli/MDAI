import {TabModel} from "../shared/models/tab.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectTabs = createFeatureSelector<ReadonlyArray<TabModel>>('tabs');
export const unsynchedTabs = createSelector(selectTabs, (tabs) => tabs.filter(tab => !tab.note.sync));
export const currentOpenTabs = createSelector(selectTabs, (tabs) => tabs.find(tab => tab.open));
