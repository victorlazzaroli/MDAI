import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {Note} from "../../shared/models/note.model";
import {TIPPY_REF, TippyInstance} from "@ngneat/helipopper";

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileContextMenuComponent {

  constructor(@Inject(TIPPY_REF) tippy: TippyInstance) {
    console.log(tippy);
  }
  rename() {
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
