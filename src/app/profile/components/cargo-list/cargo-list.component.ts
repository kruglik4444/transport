import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService
      .getCargoList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cargoList: CargoInterface[]) => {
        console.log(cargoList);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
