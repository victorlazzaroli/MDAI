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

@Component({
  selector: 'app-notes-sidebar',
  templateUrl: './notes-sidebar.component.html',
  styleUrls: ['./notes-sidebar.component.scss']
})
export class NotesSidebarComponent implements OnInit {
  @Input()
  bookname: string = 'Notes';

  protected readonly TreeListMock = TreeListMock;

  ngOnInit() {

    // showTree(TreeListMock);
    const newEl: ITreeItem = {
      name: 'Nuovo elemento',
      type: 'file',
      id: '78',
      parentId: '5'
    }

    const clone = deepCopySerializableTree(TreeListMock);
    console.log(pruneTreeItem(clone, '5'))
    console.log({TreeListMock, clone});
  }
}
