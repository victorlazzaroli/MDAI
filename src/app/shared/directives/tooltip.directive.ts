import {ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, Injector, Input} from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input({required: true})
  text: string = '';

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

}
