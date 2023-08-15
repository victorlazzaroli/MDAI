import {Component, Input, OnInit} from '@angular/core';
import {TreeListMock} from "../../shared/mocks/TreeList";
import {
  appendTreeItem,
  deepCopySerializableTree,
  findTreeItem,
  pruneTreeItem,
  showTree
} from "../../molecules/tree-list/tree-list.utils";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {notesToTreeItem} from "./notes-sidebar.utils";
import {Notes} from "../../shared/mocks/Notes";
import {Note} from "../../shared/models/note.model";
import {map, Observable, of} from "rxjs";
import {NotesService} from "../../shared/services/notes.service";
import {Store} from "@ngrx/store";
import {NotesActions, NotesApiActions} from "../../store/notes.actions";
import {selectNotes} from "../../store/notes.selectors";

@Component({
  selector: 'app-notes-sidebar',
  templateUrl: './notes-sidebar.component.html',
  styleUrls: ['./notes-sidebar.component.scss']
})
export class NotesSidebarComponent implements OnInit {
  @Input()
  bookname: string = 'Notes';

  notesTree$: Observable<ITreeItem> | undefined;

  constructor(
    private noteService: NotesService,
    private store: Store) {
    this.notesTree$ = this.store
      .select(selectNotes)
      .pipe(map(notes => notesToTreeItem([...notes])))
  }

  ngOnInit() {
    this.noteService
      .getNotes()
      .subscribe(notes => {
        this.store.dispatch(NotesApiActions.retrievedNoteList({notes}))
      });

  }

  newNote(): void {

  }
}
