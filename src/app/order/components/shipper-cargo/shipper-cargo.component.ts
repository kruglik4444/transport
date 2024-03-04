import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';

@Component({
  selector: 'app-shipper-cargo',
  templateUrl: './shipper-cargo.component.html',
  styleUrls: ['./shipper-cargo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipperCargoComponent {
  @Input() cargo!: CargoInterface;
}
