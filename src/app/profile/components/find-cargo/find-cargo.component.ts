import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CargoStatus } from 'src/app/core/enums/cargo-types.enum';
import { CargoInterface } from 'src/app/core/interfaces/common.interfaces';
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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.uploadData();
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
    let status = { status: CargoStatus.ON_APPROVAL };
    this.storageService.changeCargoStatus(id, status).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['/order', id]);
    })
  }
}
