import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './core/pages/login/login.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'krugwagen';

  destroyed$ = new Subject<void>();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.autoLogin();
    this.loginService.profileType$.pipe(takeUntil(this.destroyed$)).subscribe((profileType) => {
      if (profileType) {
        localStorage.setItem('profileType', profileType);
      }
    })
    this.loginService.profileType$.next(localStorage.getItem('profileType'));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
