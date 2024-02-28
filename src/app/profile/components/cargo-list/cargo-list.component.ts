import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();

  columnsToDisplay: string[] = [
    'Статус',
    'Откуда',
    'Куда',
    'Дата загрузки',
    'Вес, т / объём, м3',
    'Наименование груза',
    'Ставка, руб',
    'Действие'
    
  ];

  dataSource!: CargoInterface[];

  constructor(
    private storageService: StorageService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((user) => {
          return this.storageService.getCompanyCargo(user!.id);
        }),
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
}
