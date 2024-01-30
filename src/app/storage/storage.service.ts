import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { LoginService } from '../core/pages/login/login.service';
import {
  ProfileInterface,
  TruckInterface,
} from '../core/interfaces/common.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) {}

  getProfileData(): Observable<ProfileInterface> {
    return this.loginService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<ProfileInterface>(
          `https://krugwagen-default-rtdb.firebaseio.com/companies/${
            user!.id
          }.json`,
        );
      }),
    );
  }

  addNewTruck(
    truck: TruckInterface,
    userId: string,
  ): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://krugwagen-default-rtdb.firebaseio.com/companies/${userId}/trucks.json`,
      truck,
    );
  }

  addNewCargo(data: any): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://krugwagen-default-rtdb.firebaseio.com/cargo-list.json`,
      data,
    );
  }
}
