import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {DialogRef, DialogService} from "@ngneat/dialog";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {Note} from "../../shared/models/note.model";
import {TIPPY_REF, TippyInstance} from "@ngneat/helipopper";
import {InputModalComponent} from "../input-modal/input-modal.component";

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileContextMenuComponent {

  tippy: TippyInstance;
  constructor(
    @Inject(TIPPY_REF) tippy: TippyInstance,
    private readonly dialogService: DialogService
  ) {
    this.tippy = tippy;
    console.log(tippy);
  }
  rename() {
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

    renameDialog.afterClosed$.subscribe(result => console.log('modal rename ', result));
    console.log('rename');

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

  openNote() {
    console.log('open note')
  }
}
