import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { CargoStatus } from 'src/app/core/enums/cargo-types.enum';
import { TrailerTypes } from 'src/app/core/enums/truck-types.enum';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCargoComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  trailerTypes = Object.values(TrailerTypes);

  get unloading() {
    return this.form.controls['unloading'] as FormArray;
  }

  destroyed$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private storageService: StorageService,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.addUnloading();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control(null, Validators.required),
      trailerType: this.fb.control(null, Validators.required),
      weight: this.fb.control(null, Validators.required),
      size: this.fb.control(null, Validators.required),
      bet: this.fb.control(null, Validators.required),
      date: this.fb.control(null, Validators.required),
      description: this.fb.control(null),
      logistName: this.fb.control(null, Validators.required),
      logistPhone: this.fb.control(null, Validators.required),
      uploadingCity: this.fb.control(null, Validators.required),
      uploadingAddress: this.fb.control(null, Validators.required),
      unloading: this.fb.array([]),
    });
  }

  addUnloading() {
    const unloadingForm = this.fb.group({
      unloadingCity: this.fb.control(null, Validators.required),
      unloadingAddress: this.fb.control(null, Validators.required),
    });
    this.unloading.push(unloadingForm);
  }

  deleteUnloading(index: number) {
    this.unloading.removeAt(index);
  }

  next() {
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((user) => {
          return this.storageService.addNewCargo({
            ...this.form.value,
            shipperId: user!.id,
            status: CargoStatus.CREATED,
          });
        }),
      )
      .subscribe((response) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: 'Груз успешно добавлен',
        });
        this.router.navigate(['/order']);
      });
  }
}
