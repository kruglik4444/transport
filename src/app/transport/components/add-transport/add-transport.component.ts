import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { TransportStatus } from 'src/app/core/enums/cargo-types.enum';
import { TrailerTypes, TruckTypes } from 'src/app/core/enums/truck-types.enum';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransportComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  destroyed$ = new Subject<void>();

  truckTypes = Object.values(TruckTypes);

  trailerTypes = Object.values(TrailerTypes);

  customPatterns = {
    R: { pattern: new RegExp('[А-Я]') },
    N: { pattern: new RegExp('[0-9]') },
  };

  constructor(
    private fb: UntypedFormBuilder,
    private storageService: StorageService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initForm() {
    this.form = this.fb.group({
      driverName: this.fb.control(null, Validators.required),
      truckName: this.fb.control(null, Validators.required),
      truckNumber: this.fb.control(null, Validators.required),
      truckType: this.fb.control(null, Validators.required),
      trailerType: this.fb.control(null, Validators.required),
      trailerLift: this.fb.control(null, Validators.required),
      trailerSize: this.fb.control(null, Validators.required),
      driverProcent: this.fb.control(null, Validators.required),
    });
  }

  initSubscriptions() {
    this.form.controls['truckType'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (value !== TruckTypes.TRUCK) {
          this.form.addControl(
            'trailerNumber',
            this.fb.control(null, Validators.required),
          );
        } else {
          this.form.removeControl('trailerNumber');
        }
      });
  }

  next() {
    let transport = {
      ...this.form.value,
      truckStatus: TransportStatus.FREE,
      cargoId: null,
    };
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((user) =>
          this.storageService.addNewTransport(user!.id, transport),
        ),
      )
      .subscribe(() => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: 'Транспорт успешно добавлен',
        });
        this.router.navigate(['/transport/list']);
      });
  }
}
