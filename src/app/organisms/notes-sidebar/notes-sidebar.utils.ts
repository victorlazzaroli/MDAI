import {Note} from "../../shared/models/note.model";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {findTreeItem} from "../../molecules/tree-list/tree-list.utils";

export function notesToTreeItem(notes: Note[], bookName: string = 'Notes'): ITreeItem {
    const tree: ITreeItem = {
        type: 'root',
        threeId: 0,
        arrayId: -1,
        parentId: null,
        name: bookName,
        path: [],
        items: []
    }

    if (Array.isArray(notes) && notes.length > 0) {
        let idFolder = 1;

        notes
            .map((noteItem, index) => {
                return {...noteItem, arrayId: index}
            })
            .sort((noteA: Note, noteB: Note) => {
                return noteA.path > noteB.path ? -1 : 1;
            })
            .forEach((noteitem, idx, list) => {
                const pathSplitted = noteitem.path.split('/').filter(item => item.length > 0);
                let currentNode = tree;

                for (let elem of pathSplitted) {
                    let nextNode = tree.items?.find(item => item.name === elem)

                    if (!nextNode) {
                        nextNode = {
                            type: 'folder',
                            name: elem,
                            threeId: idFolder,
                            arrayId: -1,
                            path: [...currentNode.path!, currentNode.items?.length || 0],
                            parentId: currentNode.threeId,
                            expanded: true,
                            items: []
                        }

                        idFolder += 1;
                        currentNode.items?.push(nextNode);
                    }

                    currentNode = nextNode;
                }

                const bookItem: ITreeItem = {
                    type: 'file',
                    name: noteitem.title,
                    threeId: noteitem.threeId,
                    arrayId: list.length,
                    path: [...currentNode.path!, currentNode.items?.length || 0],
                    parentId: currentNode.threeId
                }
                currentNode.items?.push(bookItem)
            })
    }

    return tree;
}
