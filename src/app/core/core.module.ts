import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/notification/notification.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GeneralInfoComponent } from './pages/edit-profile/components/general-info/general-info.component';
import { ContactInfoComponent } from './pages/edit-profile/components/contact-info/contact-info.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    EditProfileComponent,
    NotificationComponent,
    GeneralInfoComponent,
    ContactInfoComponent,
    OnlyNumbersDirective,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    EditProfileComponent,
    OnlyNumbersDirective,
  ],
  providers: [provideNgxMask()],
})
export class CoreModule {}
