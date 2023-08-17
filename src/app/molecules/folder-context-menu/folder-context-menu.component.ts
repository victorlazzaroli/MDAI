import {Component, Inject} from '@angular/core';
import {TIPPY_REF, TippyInstance} from "@ngneat/helipopper";

@Component({
  selector: 'app-folder-context-menu',
  templateUrl: './folder-context-menu.component.html',
  styleUrls: ['./folder-context-menu.component.scss']
})
export class FolderContextMenuComponent {
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

  newNote() {
    console.log('new note')
  }
  newFolder() {
    console.log('new folder')
  }
}
