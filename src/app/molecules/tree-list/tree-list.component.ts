import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {mapPostTree} from "./tree-list.utils";
import {Store} from "@ngrx/store";
import {TabsActions} from "../../store/tabs.actions";
import {selectNotes} from "../../store/notes.selectors";
import {expand} from "rxjs";
import {Note} from "../../shared/models/note.model";

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit{
  @Input()
  tree: ITreeItem | null = null;

  @Output()
  openNote: EventEmitter<ITreeItem> = new EventEmitter<ITreeItem>();

  protected store: Store = inject(Store);
  private currentNote: Note | undefined;
  private notes: ReadonlyArray<Note> = [];

  ngOnInit(): void {
    this.store
        .select(selectNotes)
        .subscribe(notes => this.notes = notes)
  }

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
      console.log('Open note', {note: this.currentNote})
      return this.openNote.emit(itemSelected);
    } else if (Array.isArray(itemSelected?.items) && itemSelected.items!.length > 0) {
      this.tree.items[index] = mapPostTree(itemSelected, (item: ITreeItem) => this.itemClickClbk(item, !!itemSelected.expanded))
    }
  }

  closeTab() {

  }


}
