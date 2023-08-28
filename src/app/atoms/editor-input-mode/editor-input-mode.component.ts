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

@Component({
  selector: 'app-editor-input-mode',
  templateUrl: './editor-input-mode.component.html',
  styleUrls: ['./editor-input-mode.component.scss']
})
export class EditorInputModeComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input()
  data: string | undefined;

  @Output()
  inputText: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('pre', { static: true }) pre: ElementRef | undefined;

  preSubscription: Subscription | undefined;
  text: string | undefined;

  ngOnInit() {
    this.text = this.data;
  }

  ngAfterViewInit() {
    this.preSubscription = fromEvent(this.pre?.nativeElement, 'input')
      .pipe(
        debounceTime(1000)
      ).subscribe()
  }

  ngOnDestroy() {
    this.preSubscription?.unsubscribe();
  }

  showInput($event: any) {
    this.inputText.emit($event?.target?.textContent);
    console.log($event?.target?.textContent)
  }
}
