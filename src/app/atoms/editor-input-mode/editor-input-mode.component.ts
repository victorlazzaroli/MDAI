import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {Note} from "../../shared/models/note.model";

@Component({
  selector: 'app-editor-input-mode',
  templateUrl: './editor-input-mode.component.html',
  styleUrls: ['./editor-input-mode.component.scss']
})
export class EditorInputModeComponent implements AfterViewInit, OnDestroy {

  private _data: Note | undefined;
  @Input()
  set data(data: Note) {
    if (data.threeId !== this._data?.threeId ){
      this.text = data.text;
    }
    this._data = data;
  };

  @Output()
  inputText: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('pre', { static: true }) pre: ElementRef | undefined;

  preSubscription: Subscription | undefined;
  text: string | undefined;

  ngAfterViewInit() {
    this.preSubscription = fromEvent(this.pre?.nativeElement, 'input')
      .pipe(
        debounceTime(1000)
      ).subscribe(($event: any) => this.inputText.emit($event?.target?.textContent))
  }

  ngOnDestroy() {
    this.preSubscription?.unsubscribe();
  }
}
