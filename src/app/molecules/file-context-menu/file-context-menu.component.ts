import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {Note} from "../../shared/models/note.model";

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileContextMenuComponent {

  constructor(private ref: DialogRef<Note>) {
    console.log(ref?.data?.title)
  }
  rename() {
    console.log('rename');
    this.ref.close({action: 'rename', item: this.ref.data});
  }

  copy() {
    console.log('copy');
    this.ref.close({action: 'copy', item: this.ref.data});
  }

  move() {
    console.log('move');
    this.ref.close({action: 'move', item: this.ref.data});
  }

  delete() {
    console.log('delete');
    this.ref.close({action: 'delete', item: this.ref.data});
  }

  openNote() {
    console.log('open note')
  }
}
