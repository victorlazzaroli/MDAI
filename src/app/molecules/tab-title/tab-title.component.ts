import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {matCloseSharp} from "@ng-icons/material-icons/sharp";
import {TabModel} from "../../shared/models/tab.model";
import {Store} from "@ngrx/store";
import {TabsActions} from "../../store/tabs.actions";

@Component({
  selector: 'app-tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.scss']
})
export class TabTitleComponent {
  protected store: Store = inject(Store);

  @Input({required: true})
  tab: TabModel | undefined;

  @Input({required: true})
  navbarId: number = 0;

  @Output()
  clickEl: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  @Output()
  closeTab: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  click ($event: MouseEvent) {
    this.store.dispatch(TabsActions.selectTab({tabId: this.tab!.id, navbarId: this.navbarId }))
    this.clickEl.emit($event)
  }

  close($event: MouseEvent) {
    this.store.dispatch(TabsActions.closeTabs({tabIds: [this.tab!.id], navbarId: this.navbarId }))
    this.closeTab.emit($event)
  }
}
