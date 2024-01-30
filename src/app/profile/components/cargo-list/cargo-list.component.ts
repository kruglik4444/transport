import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoListComponent {

}
