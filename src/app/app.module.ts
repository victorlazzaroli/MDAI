import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconButtonComponent } from './atoms/icon-button/icon-button.component';
import { TabTitleComponent } from './molecules/tab-title/tab-title.component';

import {
  matHomeSharp,
  matAddSharp,
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
  matExpandLessSharp,
  matFileOpenSharp,
  matEditSharp,
  matFileCopySharp,
  matMoveDownSharp,
  matCreateNewFolderSharp,
  matNoteAddSharp
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
import { FileContextMenuComponent } from './molecules/file-context-menu/file-context-menu.component';
import {
  popperVariation,
  provideTippyConfig,
  TippyDirective,
  tooltipVariation,
  withContextMenuVariation
} from "@ngneat/helipopper";
import { FolderContextMenuComponent } from './molecules/folder-context-menu/folder-context-menu.component';
import { InputModalComponent } from './molecules/input-modal/input-modal.component';
import {FormsModule} from "@angular/forms";
import { ConfirmModalComponent } from './molecules/confirm-modal/confirm-modal.component';
import { TabNavbarComponent } from './organisms/tab-navbar/tab-navbar.component';
import {tabsReducer} from "./store/tabs.reducer";
import { EditorGridComponent } from './layouts/editor-grid/editor-grid.component';
import { LogoComponent } from './atoms/logo/logo.component';
import { EditorInputModeComponent } from './atoms/editor-input-mode/editor-input-mode.component';

const icons = {
  matHomeSharp,
  matAddSharp,
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
  matExpandLessSharp,
  matFileOpenSharp,
  matEditSharp,
  matFileCopySharp,
  matMoveDownSharp,
  matCreateNewFolderSharp,
  matNoteAddSharp
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
    TreeItemComponent,
    FileContextMenuComponent,
    FolderContextMenuComponent,
    InputModalComponent,
    ConfirmModalComponent,
    TabNavbarComponent,
    EditorGridComponent,
    LogoComponent,
    EditorInputModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgIconsModule.withIcons(icons),
    StoreModule.forRoot({notes: notesReducer, tabs: tabsReducer}),
    StoreDevtoolsModule.instrument({}),
    TippyDirective,
    FormsModule,
  ],
  providers: [
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
        contextMenu: withContextMenuVariation(popperVariation)
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
