import {Component, EventEmitter, Output} from '@angular/core';

export enum AppSidebarIcons {
  NOTE_TREE = 'Note Tree',
  APP_SETTINGS = 'Settings',
  USER_PROFILE = 'User Profile'

}

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  protected AppSidebarIcons = AppSidebarIcons;

  @Output()
  click: EventEmitter<AppSidebarIcons> = new EventEmitter<AppSidebarIcons>();

  buttonClick(button: AppSidebarIcons) {
    console.log('click')
    this.click.emit(button);
  }
}
