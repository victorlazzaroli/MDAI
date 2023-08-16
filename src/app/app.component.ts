import { Component } from '@angular/core';
import {TooltipComponent} from "./atoms/tooltip/tooltip.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ai-note-taking-assistant';
  protected readonly TooltipComponent = TooltipComponent;
}
