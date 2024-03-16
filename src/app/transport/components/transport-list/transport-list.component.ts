import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { TransportStatus } from 'src/app/core/enums/cargo-types.enum';
import { TransportInterface } from 'src/app/core/interfaces/common.interfaces';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportListComponent implements OnInit, OnDestroy {
  dataSource!: TransportInterface[];

  destroyed$ = new Subject<void>();

  columnsToDisplay: string[] = [
    'Госномер',
    'Водитель',
    'Кузов',
    'Грузоподъёмность / объём',
    'Статус',
  ];

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((user) =>
          this.storageService.getCompanyTransportList(user!.id),
        ),
      )
      .subscribe((res) => {
        this.dataSource = res;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setStatusColor(status: TransportStatus) {
    switch(status) {
      case TransportStatus.FREE:
        return 'status__free';
      case TransportStatus.IN_WORK:
        return 'status__work';
      case TransportStatus.REPAIR:
        return 'status__repair';
      case TransportStatus.VACATION:
        return 'status__vacation';
    }
  }
}
