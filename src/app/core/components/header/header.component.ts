import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginService } from '../../pages/login/login.service';
import { UserTypes } from '../../enums/user-types.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user$!: BehaviorSubject<User | null>;

  profileType$!: BehaviorSubject<string | null>;

  UserTypes = UserTypes;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user$ = this.loginService.user;
    this.profileType$ = this.loginService.profileType$;
  }

  addTruck() {
    this.router.navigate(['/profile/add-truck']);
  }

  addCargo() {
    this.router.navigate(['/profile/add-cargo']);
  }

  findCargo() {
    this.router.navigate(['/profile/find-cargo']);
  }

  showCargoList() {
    this.router.navigate(['/profile/cargo-list']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.loginService.logOut();
  }
}
