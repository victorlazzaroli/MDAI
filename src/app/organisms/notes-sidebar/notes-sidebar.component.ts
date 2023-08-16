import {Component, Input, OnInit} from '@angular/core';
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {notesToTreeItem} from "./notes-sidebar.utils";
import {Note} from "../../shared/models/note.model";
import {BehaviorSubject, combineLatest, concat, map, Observable, of, Subject, tap} from "rxjs";
import {NotesService} from "../../shared/services/notes.service";
import {Store} from "@ngrx/store";
import {NotesActions, NotesApiActions} from "../../store/notes.actions";
import {selectNotes} from "../../store/notes.selectors";
import {findTreeItem, mapPreTree} from "../../molecules/tree-list/tree-list.utils";

@Component({
  selector: 'app-notes-sidebar',
  templateUrl: './notes-sidebar.component.html',
  styleUrls: ['./notes-sidebar.component.scss']
})
export class NotesSidebarComponent implements OnInit {
  @Input()
  bookname: string = 'Notes';

  notesTree$: Observable<ITreeItem> | undefined;
  orderedTree: Observable<ITreeItem> | undefined;

  currentOrdering: 'ASC' | 'DESC' | undefined;

  orderSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  currentNoteId = 0;
  currentNewFolderId = 1;
  constructor(
    private noteService: NotesService,
    private store: Store) {
    this.notesTree$ = this.store
      .select(selectNotes)
      .pipe(
        tap(notes => {
          for (let note of notes) {
            this.currentNoteId = note.id > this.currentNoteId ? note.id : this.currentNoteId;
            const regex = /\/Nuova Cartella (\d+)\//;
            this.currentNewFolderId = Number.parseInt(note.path.match(regex)?.[1] || '0');
          }
        }),
        map(notes => notesToTreeItem([...notes])),
      )


    this.orderedTree = combineLatest([this.notesTree$, this.orderSubject]).pipe(map(latest => {
      mapPreTree(latest[0], (elem) => {
        if (Array.isArray(elem?.items)) {
          elem.items.sort((elemA, elemB) => this.orderingClbk(elemA, elemB))
        }
        // console.log(latest);
        return elem;
      })
      return latest[0]
    }))
  }



  ngOnInit() {
    this.noteService
      .getNotes()
      .subscribe(notes => {
        this.store.dispatch(NotesApiActions.retrievedNoteList({notes}))
      });
  }

  newNote(): void {
    this.currentNoteId = this.currentNoteId + 1;
    const newNote: Note = {
      id: this.currentNoteId,
      title: 'Nuova nota ' + (this.currentNoteId + 1),
      path: '/',
      sync: false,
      text: ''
    }
    this.store.dispatch(NotesActions.addNote({noteId:newNote.id, note: newNote}))
  }

  /**
   * Folders are always build up from the note path, there is no folder entity in the datasource so it is necessary to create a file when creating a folder
   */
  newFolder(): void {
    this.currentNoteId = this.currentNoteId + 1;
    this.currentNewFolderId += 1;
    const newNote: Note = {
      id: this.currentNoteId,
      title: 'Nuova nota ' + (this.currentNoteId + 1),
      path: '/Nuova Cartella ' + this.currentNewFolderId + '/',
      sync: false,
      text: ''
    }
    this.store.dispatch(NotesActions.addNote({noteId:newNote.id, note: newNote}))
  }

  sort() {
    this.currentOrdering = this.currentOrdering === 'ASC' ? 'DESC' : 'ASC';
    this.orderSubject.next(this.currentOrdering);
  }

  private orderingClbk (elemA: ITreeItem, elemB: ITreeItem): number {
    // put folder first
    if(elemA.type === 'folder' && elemB.type === 'file') return -1;
    if(elemB.type === 'folder' && elemA.type === 'file') return 1;

    if (this.currentOrdering === 'DESC')
      return elemA.name > elemB.name ? -1 : 1;
    else
      return elemA.name < elemB.name ? -1 : 1;
  }
}
