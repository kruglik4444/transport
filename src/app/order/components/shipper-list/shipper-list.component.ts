import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CargoStatus } from 'src/app/core/enums/cargo-types.enum';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-shipper-list',
  templateUrl: './shipper-list.component.html',
  styleUrls: ['./shipper-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipperListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();

  columnsToDisplay: string[] = [
    'Статус',
    'Откуда',
    'Куда',
    'Дата загрузки',
    'Вес, т / объём, м3',
    'Наименование груза',
    'Ставка, руб',
    'Действие',
  ];

  dataSource!: CargoInterface[];

  constructor(
    private storageService: StorageService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((user) => this.storageService.getCompanyCargo(user!.id)),
      )
      .subscribe((cargoList: CargoInterface[]) => {
        this.dataSource = cargoList;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setStatusColor(status: CargoStatus) {
    switch(status) {
      case CargoStatus.CREATED:
        return 'status__created';
      case CargoStatus.ON_APPROVAL:
        return 'status__approval';
      case CargoStatus.IN_WORK:
        return 'status__work';
      case CargoStatus.PAYMENT:
        return 'status__payment';
      case CargoStatus.DONE:
        return 'status__done'
    }
  }

  goToCargo(cargoId: string) {
    this.router.navigate(['/order/shipper', cargoId])
  }
}
