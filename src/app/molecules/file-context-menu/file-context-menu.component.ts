import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {DialogRef, DialogService} from "@ngneat/dialog";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {Note} from "../../shared/models/note.model";
import {TIPPY_REF, TippyInstance} from "@ngneat/helipopper";
import {InputModalComponent} from "../input-modal/input-modal.component";
import {filter} from "rxjs";
import {NotesActions} from "../../store/notes.actions";
import {Store} from "@ngrx/store";
import {selectNotes} from "../../store/notes.selectors";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {TabsActions} from "../../store/tabs.actions";

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileContextMenuComponent {

  tippy: TippyInstance;
  private fileItem: ITreeItem;
  private note: Note | null;
  private maxThreeId: number = 0;

  constructor(
    @Inject(TIPPY_REF) tippy: TippyInstance,
    private store: Store,
    private readonly dialogService: DialogService
  ) {
    this.tippy = tippy;
    this.fileItem = tippy.data;
    this.note = null;
    this.store.select(selectNotes)
        .subscribe(notes =>
        {
          if (Array.isArray(notes)) {
            this.note =  notes.find(noteItem => noteItem.threeId === this.fileItem.threeId);
            this.maxThreeId = notes.reduce((prev, curr) => curr.threeId > prev ? curr.threeId : prev, 0);
          }
        })
  }

  rename() {
    if (!this.note) {
      throw new Error('Note not found');
    }
    this.tippy.hide();
    const renameDialog = this.dialogService.open(InputModalComponent, {
      data: {
        required: true,
        modalTitle: 'Rename file',
        inputText: (this.tippy.data as ITreeItem).name,
        labelText: 'File name:'
      },
      enableClose: false
    });

    renameDialog.afterClosed$
        .pipe(filter(result => !!result))
        .subscribe(result => {
          if (this.note) {
            this.store.dispatch(NotesActions.editNotes({notes: [{...this.note, title: result!}]}))
          }
        });
  }

  copy() {
    if (!this.note) {
      throw new Error('Note not found');
    }
    this.tippy.hide();
    const copyDialog = this.dialogService.open(InputModalComponent, {
      data: {
        required: true,
        modalTitle: 'Copy to path',
        inputText: '/',
        labelText: 'File path:'
      },
      enableClose: false
    });

    copyDialog.afterClosed$
        .pipe(filter(result => !!result))
        .subscribe(result => {
          if (this.note) {
            this.store.dispatch(NotesActions.addNotes({notes: [{...this.note, threeId: this.maxThreeId + 1, path: result!}]}))
          }
        });
  }

  move() {
    if (!this.note) {
      throw new Error('Note not found');
    }
    this.tippy.hide();
    const moveDialog = this.dialogService.open(InputModalComponent, {
      data: {
        required: true,
        modalTitle: 'Move file ' + this.note.title + ' to path',
        inputText: this.note.path,
        labelText: 'File path:'
      },
      enableClose: false
    });

    moveDialog.afterClosed$
        .pipe(filter(result => !!result))
        .subscribe(result => {
          if (this.note) {
            this.store.dispatch(NotesActions.editNotes({notes: [{...this.note, path: result!}]}))
          }
        });
  }

  delete() {
    if (!this.note || this.note.threeId == null) {
      throw new Error('Note not found');
    }
    this.tippy.hide();
    const deleteConfirm = this.dialogService.open(ConfirmModalComponent, {
      data: {
        messageText: `Do you confirm delete the file ${this.note.title} ?`,
        modalTitle: 'Delete file',
        confirmButtonText: 'Delete',
        abortButtonText: 'Discard'
      },
      enableClose: true
    });

    deleteConfirm.afterClosed$
        .pipe(filter(result => !!result))
        .subscribe(result => {
          if (this.note) {
            this.store.dispatch(TabsActions.closeTabsByThreeId({threeIds: [this.note?.threeId!]}))
            this.store.dispatch(NotesActions.removeNotes({noteIds: [this.note?.threeId!]}))
          }
        });
  }

  openNote() {
    if (!this.note) {
      return;
    }
    this.store.dispatch(TabsActions.openNote({note: this.note, navbarId: 0}));
  }
}
