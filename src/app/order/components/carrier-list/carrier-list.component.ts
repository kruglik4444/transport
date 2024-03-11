import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carrier-list',
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarrierListComponent {

}
