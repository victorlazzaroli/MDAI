import {Component, Inject} from '@angular/core';
import {TIPPY_REF, TippyInstance} from "@ngneat/helipopper";
import {ITreeItem} from "../../atoms/tree-item/tree-item.component";
import {Note} from "../../shared/models/note.model";
import {Store} from "@ngrx/store";
import {DialogService} from "@ngneat/dialog";
import {selectNotes} from "../../store/notes.selectors";
import {InputModalComponent} from "../input-modal/input-modal.component";
import {filter, map} from "rxjs";
import {NotesActions} from "../../store/notes.actions";
import {mapPreTree} from "../tree-list/tree-list.utils";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {TabsActions} from "../../store/tabs.actions";

@Component({
    selector: 'app-folder-context-menu',
    templateUrl: './folder-context-menu.component.html',
    styleUrls: ['./folder-context-menu.component.scss']
})
export class FolderContextMenuComponent {
    tippy: TippyInstance;
    private folderItem: ITreeItem;
    private notes: Note[] = [];
    private maxThreeId: number = 0;
    private folderPath: string = '/';

    constructor(
        @Inject(TIPPY_REF) tippy: TippyInstance,
        private store: Store,
        private readonly dialogService: DialogService
    ) {
        this.tippy = tippy;
        this.folderItem = tippy.data;
        this.store.select(selectNotes)
            .subscribe(notes => {
                if (Array.isArray(notes)) {
                    this.notes = notes;
                    this.maxThreeId = notes.reduce((prev, curr) => curr.threeId > prev ? curr.threeId : prev, 0);
                }

                this.folderPath = this.determineFolderPath();
            })

    }

    rename() {
        if (!this.notes) {
            throw new Error('Note not found');
        }
        this.tippy.hide();
        const renameDialog = this.dialogService.open(InputModalComponent, {
            data: {
                required: true,
                modalTitle: 'Rename folder',
                inputText: (this.tippy.data as ITreeItem).name,
                labelText: 'Folder name:'
            },
            enableClose: false
        });

        renameDialog.afterClosed$
            .pipe(filter(result => !!result), map(result => result!.endsWith('/') ? result : result + '/'))
            .subscribe(result => {
                this.notes = this.notes.map(note => {
                    return {
                        ...note,
                        path: this.replaceFolderNameInPath(note.path, this.folderItem.path!, this.folderItem.name, result!)
                    };
                })

                if (Array.isArray(this.notes)) {
                    this.store.dispatch(NotesActions.editNotes({notes: this.notes}))
                }
            });

    }

    copy() {

        if (!this.notes) {
            throw new Error('Note not found');
        }

        this.tippy.hide();
        const copyDialog = this.dialogService.open(InputModalComponent, {
            data: {
                required: true,
                modalTitle: 'Copy folder to',
                labelText: 'Path:'
            },
            enableClose: false
        });

        copyDialog.afterClosed$
            .pipe(filter(result => !!result), map(result => result!.endsWith('/') ? result : result + '/'))
            .subscribe(result => {
                // const treePathArrayLen = this.folderItem.path?.length || 1;
                const notesToCopy = this.notes.filter(note => {
                    // const separatedStrings = note.path.split('/').filter(str => !!str);
                    // return separatedStrings[treePathArrayLen - 1] === this.folderItem.name;
                    return note.path.startsWith(this.folderPath + this.folderItem.name);
                }).map(newNote => {
                    const remainPath = newNote.path.split(this.folderPath + this.folderItem.name).filter(str => !!str);
                    const newPath = [result!, this.folderItem.name, remainPath[0]].join('');
                    this.maxThreeId = this.maxThreeId + 1;
                    return {...newNote, path: newPath, threeId: this.maxThreeId}
                })

                if (Array.isArray(notesToCopy)) {
                    this.store.dispatch(NotesActions.addNotes({notes: notesToCopy}))
                }
            });
    }

    move() {
        if (!this.notes) {
            throw new Error('Note not found');
        }

        this.tippy.hide();
        const moveDialog = this.dialogService.open(InputModalComponent, {
            data: {
                required: true,
                modalTitle: 'Move folder to',
                labelText: 'Path :'
            },
            enableClose: false
        });

        moveDialog.afterClosed$
            .pipe(filter(result => !!result), map(result => result!.endsWith('/') ? result : result + '/'))
            .subscribe(result => {
                const notesToMove = this.notes.filter(note => {
                    return note.path.startsWith(this.folderPath + this.folderItem.name);
                }).map(movingNote => {
                    const remainPath = movingNote.path.split(this.folderPath + this.folderItem.name).filter(str => !!str);
                    return {...movingNote, path: [result!, this.folderItem.name, remainPath[0]].join('')};
                })


                if (Array.isArray(notesToMove)) {
                    this.store.dispatch(NotesActions.editNotes({notes: notesToMove}))
                }
            });
    }

    delete() {
        if (!this.notes) {
            throw new Error('Note not found');
        }
        this.tippy.hide();
        const deleteConfirm = this.dialogService.open(ConfirmModalComponent, {
            data: {
                messageText: `Do you confirm delete the folder ${this.folderItem.name} ?`,
                modalTitle: 'Delete folder',
                confirmButtonText: 'Delete',
                abortButtonText: 'Discard'
            },
            enableClose: true
        });

        deleteConfirm.afterClosed$
            .pipe(filter(result => !!result))
            .subscribe(result => {
                const notesToDelete = this.notes.filter(note => {
                    return note.path.startsWith(this.folderPath + this.folderItem.name);
                }).map(deletingNote => {
                    return deletingNote.threeId
                })
                if (notesToDelete) {
                    this.store.dispatch(TabsActions.closeTabsByThreeId({threeIds: notesToDelete}))
                    this.store.dispatch(NotesActions.removeNotes({noteIds: notesToDelete}))
                }
            });
    }

    newNote() {
        if (!this.notes) {
            throw new Error('Note not found');
        }

        this.tippy.hide();
        const newNoteDialog = this.dialogService.open(InputModalComponent, {
            data: {
                required: true,
                modalTitle: 'New note',
                labelText: 'Title :'
            },
            enableClose: false
        });

        newNoteDialog.afterClosed$
            .pipe(filter(result => !!result))
            .subscribe(result => {
                this.maxThreeId = this.maxThreeId + 1;
                const found = this.folderItem.items?.find(note => note.type === 'file' && note.name === result)
                const newNote: Note = {
                    threeId: this.maxThreeId,
                    title: !found ? result! : result! + ' ' + this.maxThreeId,
                    path: this.folderPath + this.folderItem.name + '/',
                    sync: false,
                    text: ''
                }

                this.store.dispatch(NotesActions.addNotes({notes: [{...newNote}]}))
                this.store.dispatch(TabsActions.openNote({note: newNote, navbarId: 0}))
            });

    }

    newFolder() {
        if (!this.notes) {
            throw new Error('Note not found');
        }

        this.tippy.hide();
        const newFolderDialog = this.dialogService.open(InputModalComponent, {
            data: {
                required: true,
                modalTitle: 'New Folder',
                labelText: 'Name :'
            },
            enableClose: false
        });

        newFolderDialog.afterClosed$
            .pipe(filter(result => !!result))
            .subscribe(result => {
                this.maxThreeId = this.maxThreeId + 1;
                const newNote: Note = {
                    threeId: this.maxThreeId,
                    title: 'New note ' + this.maxThreeId,
                    path: this.folderPath +  this.folderItem.name + '/' + result! + '/',
                    sync: false,
                    text: ''
                }

                this.store.dispatch(NotesActions.addNotes({notes: [{...newNote}]}))
            });
    }

    private replaceFolderNameInPath(notePath: string, parentIds: number[], oldFolderName: string, newFolderName: string): string {
        const separatedStrings = notePath.split('/').filter(str => !!str);
        if (separatedStrings[parentIds.length - 1] === oldFolderName) {
            separatedStrings[parentIds.length - 1] = newFolderName;
        }

        return `/${separatedStrings.join('/')}/` ;
    }

    private determineFolderPath(): string {
        const treePathArrayLen = this.folderItem.path?.length || 1;

        for (let note of this.notes) {
            const separatedStrings = note.path.split('/').filter(str => !!str);
            if (separatedStrings[treePathArrayLen - 1] === this.folderItem.name) {
                separatedStrings.pop();

                if (separatedStrings.length === 0) return '/';

                return `/${separatedStrings.join('/')}/` ;
            }
        }

        return '/';
    }

}
