import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconButtonComponent } from './atoms/icon-button/icon-button.component';
import { TabTitleComponent } from './molecules/tab-title/tab-title.component';

import {
  matHomeSharp,
  mat1kPlusSharp,
  matDoneSharp,
  matDeleteSharp,
  matEditNoteSharp,
  matAccountCircleSharp,
  matQuestionMarkSharp,
  matShareSharp,
  matMoreVertSharp,
  matSearchSharp,
  matCloseSharp,
  matPlusSharp,
  matFolderOpenSharp,
  matSortSharp,
  matExpandMoreSharp,
  matExpandLessSharp
} from '@ng-icons/material-icons/sharp';
import { TooltipComponent } from './atoms/tooltip/tooltip.component';
import { TooltipDirective } from './shared/directives/tooltip.directive';
import { NotesSidebarComponent } from './organisms/notes-sidebar/notes-sidebar.component';
import { TreeListComponent } from './molecules/tree-list/tree-list.component';
import { TreeItemComponent } from './atoms/tree-item/tree-item.component'
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {notesReducer} from "./store/notes.reducer";
import {HttpClientModule} from "@angular/common/http";

const icons = {
  matHomeSharp,
  mat1kPlusSharp,
  matDoneSharp,
  matDeleteSharp,
  matEditNoteSharp,
  matAccountCircleSharp,
  matQuestionMarkSharp,
  matShareSharp,
  matMoreVertSharp,
  matSearchSharp,
  matCloseSharp,
  matPlusSharp,
  matFolderOpenSharp,
  matSortSharp,
  matExpandMoreSharp,
  matExpandLessSharp
};

@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    TabTitleComponent,
    TooltipComponent,
    TooltipDirective,
    NotesSidebarComponent,
    TreeListComponent,
    TreeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgIconsModule.withIcons(icons),
    StoreModule.forRoot({notes: notesReducer}),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
