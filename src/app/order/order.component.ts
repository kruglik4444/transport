import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CargoInterface } from '../core/interfaces/common.interfaces';
import { StorageService } from '../storage/storage.service';
import { LoginService } from '../core/pages/login/login.service';
import { UserTypes } from '../core/enums/user-types.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit {
  cargo$!: Observable<CargoInterface>;

  profileType$!: BehaviorSubject<string | null>;

  UserTypes = UserTypes;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    const cargoId = this.route.snapshot.paramMap.get('id')!;
    this.cargo$ = this.storageService.getCargoById(cargoId);
    this.profileType$ = this.loginService.profileType$;
  }
}
