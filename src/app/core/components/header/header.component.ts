import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginService } from '../../pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';
import { UserTypes } from '../../enums/user-types.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  user$!: BehaviorSubject<User | null>;

  profileType!: string | null;

  UserTypes = UserTypes;

  destroyed$ = new Subject<void>();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$ = this.loginService.user;
    this.loginService.profileType$.pipe(takeUntil(this.destroyed$))
    .subscribe((profileType) => {
      this.profileType = profileType;
      this.cdr.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addTruck() {
    this.router.navigate(['/profile/add-truck'])
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  logout() {
    this.loginService.logOut();
  }
}
