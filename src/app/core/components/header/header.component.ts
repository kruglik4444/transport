import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginService } from '../../pages/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  user$!: BehaviorSubject<User | null>;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.user$ = this.loginService.user;
  }

}
