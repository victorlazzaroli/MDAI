import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  path: string[] = ['Cartella 1', 'Cartella Deep', 'Senza nome'];
  fileTitle: string = 'Senza nome';
  isViewMode: boolean = false;

  inputText = ''

  setInputText(text: string) {
    this.inputText = text;
  }
}
