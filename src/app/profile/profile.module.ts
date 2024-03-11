import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddTruckComponent } from './components/add-truck/add-truck.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TruckListComponent } from './components/truck-list/truck-list.component';
import { AddCargoComponent } from './components/add-cargo/add-cargo.component';
import { CargoListComponent } from './components/cargo-list/cargo-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { FindCargoComponent } from './components/find-cargo/find-cargo.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AddTruckComponent,
    TruckListComponent,
    AddCargoComponent,
    CargoListComponent,
    FindCargoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CoreModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  exports: [
    ProfileComponent,
  ],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ProfileModule {}
