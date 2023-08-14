import {Note} from "../../shared/models/note.model";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";

export function notesToTreeItem(notes: Note[], bookName: string = 'Notes'): ITreeItem {
  const tree: ITreeItem = {
    type: 'root',
    id: 'root',
    parentId: null,
    name: bookName,
    items: []
  }

  if (!Array.isArray(notes) || notes.length === 0) {
    tree.items?.push({
      type: 'file',
      name: 'New note',
      id: 'root:note0',
      parentId: 'root'
    })
  } else {
    notes.sort((noteA: Note, noteB: Note) => {
      return noteA.path > noteB.path ? -1 : 1;
    }).forEach((noteitem) => {
      noteitem
    })
  }

  return tree;
}
