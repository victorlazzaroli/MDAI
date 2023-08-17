import {Component, ComponentRef, EventEmitter, Input, Output} from '@angular/core';
import {DialogRef, DialogService} from "@ngneat/dialog";
import {FileContextMenuComponent} from "../../molecules/file-context-menu/file-context-menu.component";
import {FolderContextMenuComponent} from "../../molecules/folder-context-menu/folder-context-menu.component";

export interface ITreeItem {
  type: 'root' | 'folder' | 'file',
  name: string,
  parentId: number | null,
  threeId: number, // Id of the tree elment not to be confused with the id of the note database id
  arrayId?: number, // index of store array containing all the notes not sorted
  items?: ITreeItem[],
  path?: number[],
  expanded?: boolean
}

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent {
  protected readonly FileContextMenuComponent = FileContextMenuComponent;
  protected readonly FolderContextMenuComponent = FolderContextMenuComponent;

  @Input({required: true})
  item: ITreeItem | null = null;

  @Output()
  itemClick: EventEmitter<ITreeItem | null> = new EventEmitter<ITreeItem | null>();


  open() {
    if (this.item?.expanded != null) {
      this.item.expanded = !this.item.expanded;
    }
    this.itemClick.emit(this.item);
  }

}
