import { Component, OnInit } from '@angular/core';
import { LoginService } from './core/pages/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'krugwagen';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.autoLogin();
  }
}
