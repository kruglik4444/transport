import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportComponent } from './transport.component';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportListComponent } from './components/transport-list/transport-list.component';
import { TransportItemComponent } from './components/transport-item/transport-item.component';
import { AddTransportComponent } from './components/add-transport/add-transport.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    TransportComponent,
    TransportListComponent,
    TransportItemComponent,
    AddTransportComponent,
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [provideNgxMask()],
})
export class TransportModule {}
