import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface ITreeItem {
  type: 'root' | 'folder' | 'file',
  name: string,
  parentId: string | null,
  id: string,
  items?: ITreeItem[],
  expanded?: boolean
}

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent {
  @Input({required: true})
  item: ITreeItem | null = null;

  @Output()
  itemClick: EventEmitter<ITreeItem | null> = new EventEmitter<ITreeItem | null>()

  open() {
    if (this.item?.expanded != null) {
      this.item.expanded = !this.item.expanded;
    }
    this.itemClick.emit(this.item);
  }
}
