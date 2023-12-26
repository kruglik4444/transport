import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginService } from '../../pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';
import { UserTypes } from '../../enums/user-types.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  user$!: BehaviorSubject<User | null>;

  profileType!: string | null;

  UserTypes = UserTypes;

  destroyed$ = new Subject<void>();

  constructor(private loginService: LoginService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.user$ = this.loginService.user;
    this.storageService.profileType$.pipe(takeUntil(this.destroyed$)).subscribe((profileType) => {
      this.profileType = profileType;
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.loginService.logOut();
  }

}
