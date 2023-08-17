import {Component, ComponentRef, EventEmitter, Input, Output} from '@angular/core';
import {DialogRef, DialogService} from "@ngneat/dialog";
import {FileContextMenuComponent} from "../../molecules/file-context-menu/file-context-menu.component";
import {FolderContextMenuComponent} from "../../molecules/folder-context-menu/folder-context-menu.component";

export interface ITreeItem {
  type: 'root' | 'folder' | 'file',
  name: string,
  parentId: string | null,
  id: string,
  arrayId: number,
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

  constructor(private dialogService: DialogService) {

  }

  open() {
    if (this.item?.expanded != null) {
      this.item.expanded = !this.item.expanded;
    }
    this.itemClick.emit(this.item);
  }

}
