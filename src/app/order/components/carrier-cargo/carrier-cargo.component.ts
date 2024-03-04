import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';

@Component({
  selector: 'app-carrier-cargo',
  templateUrl: './carrier-cargo.component.html',
  styleUrls: ['./carrier-cargo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarrierCargoComponent implements OnInit{

  @Input() cargo!: CargoInterface;

  constructor() {}

  ngOnInit(): void {
    console.log(this.cargo);
  }
}
