import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {mapPostTree} from "./tree-list.utils";

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent {
  @Input()
  tree: ITreeItem | null = null;

  @Output()
  openNote: EventEmitter<ITreeItem> = new EventEmitter<ITreeItem>();

  itemClickClbk = (item: ITreeItem, expand: boolean): ITreeItem => {
    if(item.type === 'folder') {
      item.expanded = expand;
    }
    console.log({item, expand});
    return item;
  }
  itemClick(itemSelected: ITreeItem | null, index: number) {
    if (!Array.isArray(this.tree?.items) || !this.tree?.items[index] || !itemSelected){
      return;
    }
    if (itemSelected?.type === 'file') {
      return this.openNote.emit(itemSelected);
    } else if (Array.isArray(itemSelected.items) && itemSelected.items.length > 0) {
      this.tree.items[index] = mapPostTree(itemSelected, (item: ITreeItem) => this.itemClickClbk(item, !!itemSelected.expanded))
    }
  }
}
