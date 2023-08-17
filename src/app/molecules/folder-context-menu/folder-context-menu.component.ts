import {Component, Inject} from '@angular/core';
import {TIPPY_REF, TippyInstance} from "@ngneat/helipopper";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {Note} from "../../shared/models/note.model";
import {Store} from "@ngrx/store";
import {DialogService} from "@ngneat/dialog";
import {selectNotes} from "../../store/notes.selectors";
import {InputModalComponent} from "../input-modal/input-modal.component";
import {filter} from "rxjs";
import {NotesActions} from "../../store/notes.actions";
import {mapPreTree} from "../tree-list/tree-list.utils";

@Component({
  selector: 'app-folder-context-menu',
  templateUrl: './folder-context-menu.component.html',
  styleUrls: ['./folder-context-menu.component.scss']
})
export class FolderContextMenuComponent {
  tippy: TippyInstance;
  private folderItem: ITreeItem;
  private notes: Note[] = [];
  private maxThreeId: number = 0;

  constructor(
      @Inject(TIPPY_REF) tippy: TippyInstance,
      private store: Store,
      private readonly dialogService: DialogService
  ) {
    this.tippy = tippy;
    this.folderItem = tippy.data;
    this.store.select(selectNotes)
        .subscribe(notes =>
        {
          if (Array.isArray(notes)) {
            this.notes =  notes;
            this.maxThreeId = notes.reduce((prev, curr) => curr.threeId > prev ? curr.threeId : prev, 0);

          }
        })

  }

  rename() {
    if (!this.notes) {
      throw new Error('Note not found');
    }
    this.tippy.hide();
    const renameDialog = this.dialogService.open(InputModalComponent, {
      data: {
        required: true,
        modalTitle: 'Rename folder',
        inputText: (this.tippy.data as ITreeItem).name,
        labelText: 'Folder name:'
      },
      enableClose: false
    });

    renameDialog.afterClosed$
        .pipe(filter(result => !!result))
        .subscribe(result => {
          this.notes = this.notes.map(note => {
            return {...note, path: this.replaceFolderNameInPath(note.path, this.folderItem.path!, this.folderItem.name, result!)};
          })

          if (Array.isArray(this.notes)) {
            this.store.dispatch(NotesActions.editNotes({notes: this.notes}))
          }
        });

  }

  copy() {
    console.log('copy');
  }

  move() {
    console.log('move');
  }

  delete() {
    console.log('delete');
  }

  newNote() {
    console.log('new note')
  }
  newFolder() {
    console.log('new folder')
  }

  private replaceFolderNameInPath(notePath: string, parentIds: number[], oldFolderName: string, newFolderName: string): string {
    const separatedStrings = notePath.split('/').filter(str => !!str);
    if (separatedStrings[parentIds.length - 1] === oldFolderName) {
      separatedStrings[parentIds.length - 1] = newFolderName;
    }

    return '/' + separatedStrings.join('/') + '/';
  }

}
