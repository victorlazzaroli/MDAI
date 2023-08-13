import {Component, Input} from '@angular/core';
import {matCloseSharp} from "@ng-icons/material-icons/sharp";

@Component({
  selector: 'app-tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.scss']
})
export class TabTitleComponent {
  @Input({required: true})
  title: string = '';

  protected readonly matCloseSharp = matCloseSharp;
}
