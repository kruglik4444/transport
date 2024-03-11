import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../core/pages/login/login.service';
import { UserTypes } from '../core/enums/user-types.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit {

  profileType$!: BehaviorSubject<string | null>;

  UserTypes = UserTypes;

  constructor(
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.profileType$ = this.loginService.profileType$;
  }
}
