import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportListComponent {

}
