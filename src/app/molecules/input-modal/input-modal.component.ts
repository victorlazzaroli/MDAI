import {Component, ElementRef, inject, Input, ViewChild, ViewRef} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";


export interface InputModalI {
  labelText?: string;
  required?: boolean;
  modalTitle?: string;
  inputText?: string;
}


@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent {
  readonly dialogRef: DialogRef<InputModalI, string> = inject(DialogRef);

  protected modalData: InputModalI | undefined;

  protected inputText: string | undefined;

  @ViewChild('ctrl') inputEl: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.modalData = this.dialogRef?.data;
    this.inputText = this.modalData?.inputText;
  }

  save():void {
    // if (!this.inputEl) {
    //   return;
    // }
    this.dialogRef.close(this.inputText);
  }
  close(): void {
    this.dialogRef.close();
  }
}
