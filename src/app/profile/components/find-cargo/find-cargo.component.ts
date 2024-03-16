import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { CargoStatus } from 'src/app/core/enums/cargo-types.enum';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-find-cargo',
  templateUrl: './find-cargo.component.html',
  styleUrls: ['./find-cargo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindCargoComponent implements OnInit, OnDestroy {
  dataSource!: CargoInterface[];

  destroyed$ = new Subject<void>();

  userId!: string;

  columnsToDisplay: string[] = [
    'Откуда',
    'Куда',
    'Дата загрузки',
    'Вес, т / объём, м3',
    'Наименование груза',
    'Тип кузова',
    'Ставка, руб',
    'Действие',
  ];

  constructor(
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.uploadData();
    this.loginService.user
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.userId = user!.id;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  uploadData() {
    this.storageService
      .getCargoList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cargoList: CargoInterface[]) => {
        this.dataSource = cargoList;
        this.cdr.markForCheck();
      });
  }

  selectCargo(id: string) {
    let offer = { status: CargoStatus.ON_APPROVAL, carrierId: this.userId };
    this.storageService
      .changeCargoStatus(id, offer)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.uploadData();
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: 'Рейс добавлен на согласование заказчику',
        });
      });
  }
}
