import {Component, inject} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";

export interface ConfirmModalI {
  messageText?: string;
  modalTitle?: string;
  confirmButtonText?: string;
  abortButtonText?: string;
}
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  readonly dialogRef: DialogRef<ConfirmModalI, boolean> = inject(DialogRef);

  protected modalData: ConfirmModalI = this.dialogRef.data;

  confirm():void {
    this.dialogRef.close(true);
  }
  abort(): void {
    this.dialogRef.close(false);
  }

}
