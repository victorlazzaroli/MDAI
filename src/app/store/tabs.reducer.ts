import {createReducer, on} from "@ngrx/store";
import {TabModel} from "../shared/models/tab.model";
import {TabsActions} from "./tabs.actions";
import {Note} from "../shared/models/note.model";

export const initialState: ReadonlyArray<TabModel> = [];

function openTabReducer(_state: ReadonlyArray<TabModel>, {tabId, navbarId}: {
  tabId: number,
  navbarId: number
}): TabModel[] {
  return _state.map(tab => {
    if (tab.id === tabId && tab.navbarId == navbarId) {
      return {...tab, open: true};
    } else {
      return {...tab, open: false};
    }
  })
}

function tabFromNoteBuilder(note: Note, numTabs: number, navbarId: number = 0, open: boolean = false): TabModel {
  return {
    id: numTabs, navbarId: navbarId, note: note, open: open

  }
}

function closeAllTabs(tabs: ReadonlyArray<TabModel>): TabModel[] {
  return tabs.map(tab => ({...tab, open: false}))
}

export const tabsReducer = createReducer(
  initialState,
  on(TabsActions.openNote, (_state, {note, navbarId}) => {
    const newState = closeAllTabs(_state);
    const found = newState.find(tab => tab.note.threeId === note.threeId);
    if (found) {
      found.open = true;
    } else {
      let tabItem: TabModel;
      const newId = newState.reduce((prev, curr) => curr.id > prev ? curr.id : prev, newState.length) + 1;
      tabItem = tabFromNoteBuilder(note, newId, navbarId, true);
      newState.push(tabItem);
    }
    return newState;
  }),
  on(TabsActions.closeTabs, (_state, {
    tabIds,
    navbarId
  }) => _state.filter(elem => !tabIds.includes(elem.id) && elem.navbarId === navbarId)),
  on(TabsActions.selectTab, openTabReducer),
  on(TabsActions.closeTabsByThreeId, (_state, {threeIds}) => _state.filter(elem => !threeIds.includes(elem.note.threeId))),
  on(TabsActions.refreshTabByThreeId, (_state, {note}) => {
    return [..._state].map(el => {
      if (el.note.threeId === note.threeId) {
        return {...el, note}
      }

      return el;
    })
  })
);
