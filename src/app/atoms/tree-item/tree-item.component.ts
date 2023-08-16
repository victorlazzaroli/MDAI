import {Component, ComponentRef, EventEmitter, Input, Output} from '@angular/core';
import {DialogRef, DialogService} from "@ngneat/dialog";
import {FileContextMenuComponent} from "../../molecules/file-context-menu/file-context-menu.component";

export interface ITreeItem {
  type: 'root' | 'folder' | 'file',
  name: string,
  parentId: string | null,
  id: string,
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

  openContext($event: any) {
    $event.preventDefault();
    if(this.item?.type === 'file') {
      const fileContextMenu = this.dialogService.open(FileContextMenuComponent, {
        size: '200px',
        closeButton: false,
        backdrop: false,
        windowClass: 'contextMenuContainer'
      });
      (fileContextMenu.ref as ComponentRef<HTMLDivElement>).location.nativeElement.style.position = 'fixed';
      (fileContextMenu.ref as ComponentRef<HTMLDivElement>).location.nativeElement.style.top = $event.clientY + 'px';
      console.log({ref: fileContextMenu.ref});
      fileContextMenu.afterClosed$.subscribe(console.log);
    }
  }

  protected readonly FileContextMenuComponent = FileContextMenuComponent;
}
