import {Component, EventEmitter, Input, Output} from '@angular/core';
import {matCloseSharp} from "@ng-icons/material-icons/sharp";

type sizeTypes =  'extrasmall' | 'small' | 'normal' | 'large';
type typeTypes = 'button' | 'submit';
type theme = 'fill' | 'outline' | 'none';
@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input({required: true})
  icon: string = '';
  @Input()
  size: sizeTypes = 'normal';
  @Input()
  type: typeTypes = 'button';
  @Input()
  disabled = false;
  @Input()
  theme: theme = 'none';
  @Input()
  selected: boolean = false;

  @Output()
  press = new EventEmitter<Event>()

  sizeToPx: {[key: string]: string} = {
    extrasmall: '16px',
    small: '24px',
    normal: '32px',
    large: '64px'
  }

  buttonPress($event: Event) {
    this.press.emit($event);
  }

  protected readonly matCloseSharp = matCloseSharp;
}
