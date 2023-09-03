import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {currentOpenTabs} from "../../store/tabs.selectors";
import {Note} from "../../shared/models/note.model";
import {Observable, Subject, takeUntil} from "rxjs";
import {TabModel} from "../../shared/models/tab.model";
import {NotesActions} from "../../store/notes.actions";
import {TabsActions} from "../../store/tabs.actions";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy{

  protected store: Store = inject(Store);

  private unsubscribeSubject = new Subject<boolean>;

  path: string[] = [];
  isViewMode: boolean = false;
  currentNote: TabModel | undefined | null;

  ngOnInit() {
    this.store.select(currentOpenTabs)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(
      (tab) => {
        if (tab) {
          this.currentNote = {...tab};
          this.currentNote.note = {...tab.note}
          this.path = this.currentNote.note.path.split('/').filter(str => !!str).concat(this.currentNote.note.title)
        } else {
          this.path = [];
          this.currentNote = null;
        }
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next(true);
  }

  setInputText(text: string) {
    if (!this.currentNote?.note) {
      return;
    }

    this.currentNote.note.text = text;
    this.updateNoteStore(this.currentNote.note)
  }

  updateNote() {
    if (!this.currentNote?.note) {
      return;
    }

    this.updateNoteStore(this.currentNote.note)
  }

  updateNoteStore(note: Note) {
    this.store.dispatch(NotesActions.editNotes({notes: [note]}))
    this.store.dispatch(TabsActions.refreshTabByThreeId({note}))
  }
}
