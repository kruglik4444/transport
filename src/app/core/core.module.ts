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
import { MatStepperModule } from '@angular/material/stepper';
import { GeneralInfoComponent } from './pages/edit-profile/components/general-info/general-info.component';
import { ContactInfoComponent } from './pages/edit-profile/components/contact-info/contact-info.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    EditProfileComponent,
    NotificationComponent,
    GeneralInfoComponent,
    ContactInfoComponent,
    OnlyNumbersDirective,
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
    MatStepperModule,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    EditProfileComponent,
    OnlyNumbersDirective,
  ],
})
export class CoreModule {}
