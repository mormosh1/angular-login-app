import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { FilesComponent } from './pages/files/files.component';
import { NewsComponent } from './pages/news/news.component';
import { FAQComponent } from './pages/faq/faq.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MainDashboardComponent } from './main-dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '../../material.module';
import { SideProfileComponent } from './sidenav/side-profile/side-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserChipComponent } from './pages/users/user-chip/user-chip.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';
import { UserPreviewComponent } from './pages/users/user-preview/user-preview.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImagePreloadDirective } from './../../shared/directives/ImagePreload.directive';
import { HeaderComponent } from './header/header.component';
import { Notfoundpage404Component } from './pages/notfoundpage404/notfoundpage404.component';
import { AuthGuard } from '../auth/authGuard.service';


const dashboardRoutes: Routes = [
  {
    path: '', component: MainDashboardComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'faq', component: FAQComponent },
      { path: 'news', component: NewsComponent },
      { path: 'files', component: FilesComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', component: Notfoundpage404Component, pathMatch: 'full' }
    ],

  },

];


@NgModule({
  declarations: [
    SidenavComponent,
    MainDashboardComponent,
    SettingsComponent,
    HelpComponent,
    FAQComponent,
    NewsComponent,
    FilesComponent,
    UsersComponent,
    SidenavComponent,
    SideProfileComponent,
    DashboardComponent,
    HeaderComponent,
    UserChipComponent,
    UserAddComponent,
    UserPreviewComponent,
    ImagePreloadDirective,
    Notfoundpage404Component
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [ImagePreloadDirective],
  providers: [],
  entryComponents: [UserAddComponent]
})
export class MainDashboardModule { }
