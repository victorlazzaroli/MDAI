import {Component, ComponentRef, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {DialogRef, DialogService} from "@ngneat/dialog";
import {FileContextMenuComponent} from "../../molecules/file-context-menu/file-context-menu.component";
import {FolderContextMenuComponent} from "../../molecules/folder-context-menu/folder-context-menu.component";
import {Store} from "@ngrx/store";
import {Note} from "../../shared/models/note.model";
import {selectNotes} from "../../store/notes.selectors";
import {TabsActions} from "../../store/tabs.actions";

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
export class TreeItemComponent implements OnInit{
  protected readonly FileContextMenuComponent = FileContextMenuComponent;
  protected readonly FolderContextMenuComponent = FolderContextMenuComponent;
  protected store: Store = inject(Store);
  private currentNote: Note | undefined;

  @Input({required: true})
  item: ITreeItem | null = null;


  @Output()
  itemClick: EventEmitter<ITreeItem | null> = new EventEmitter<ITreeItem | null>();

  ngOnInit(): void {
    if(!this.item || (this.item?.arrayId == null && this.item.type === 'file')) {
      throw new Error(`Invalid argument ${this.item?.name}`)
    }
    if (this.item?.arrayId != null) {
      this.store
          .select(selectNotes)
          .subscribe(notes => this.currentNote = notes[this.item!.arrayId!])
    }
  }

  open() {
    if (this.item?.type === 'folder' && this.item?.expanded != null) {
      this.item.expanded = !this.item.expanded;
    }

    if (this.item?.type === 'file' && this.currentNote) {
      this.store.dispatch(TabsActions.openNote({note: this.currentNote, navbarId: 0}))
    }
    this.itemClick.emit(this.item);
  }

}
