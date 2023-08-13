import {Component, Input} from '@angular/core';
import {TreeListMock} from "../../shared/mocks/TreeList";

@Component({
  selector: 'app-notes-sidebar',
  templateUrl: './notes-sidebar.component.html',
  styleUrls: ['./notes-sidebar.component.scss']
})
export class NotesSidebarComponent {
  @Input()
  bookname: string = 'Notes';

  protected readonly TreeListMock = TreeListMock;
}
