import {Note} from "./note.model";

export interface TabModel {
    id: number,
    note: Note,
    navbarId: number,
    open: boolean
}
