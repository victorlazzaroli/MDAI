import {createActionGroup, props} from "@ngrx/store";
import {TabModel} from "../shared/models/tab.model";
import {Note} from "../shared/models/note.model";

export const TabsActions = createActionGroup({
    source: 'Tabs',
    events: {
        'Open Note': props<{note: Note, navbarId: number}>(),
        'Close Tabs': props<{tabIds: number[], navbarId: number}>(),
        'Close Tabs By ThreeId': props<{threeIds: number[]}>(),
        'Select Tab': props<{tabId: number, navbarId: number}>(),
        'Refresh Tab By ThreeId': props<{note: Note}>()
    }
})
