import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-shipper-cargo',
  templateUrl: './shipper-cargo.component.html',
  styleUrls: ['./shipper-cargo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipperCargoComponent implements OnInit, OnDestroy {
  cargo!: CargoInterface;

  destroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.storageService
      .getCargoById(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cargo) => {
        this.cargo = cargo;
        console.log(this.cargo);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
