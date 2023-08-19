import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectTabs} from "../../store/tabs.selectors";
import {TabModel} from "../../shared/models/tab.model";
import {TabsActions} from "../../store/tabs.actions";

@Component({
  selector: 'app-tab-navbar',
  templateUrl: './tab-navbar.component.html',
  styleUrls: ['./tab-navbar.component.scss']
})
export class TabNavbarComponent {
  protected store: Store = inject(Store);

  protected tabs$;

  constructor() {
    this.tabs$ = this.store.select(selectTabs);
  }
}
