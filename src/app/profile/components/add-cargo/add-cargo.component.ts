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
import { Subject, exhaustMap, takeUntil } from 'rxjs';
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

  destroyed$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private storageService: StorageService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.initForm();
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
      fromAddress: this.fb.control(null, Validators.required),
      toAddress: this.fb.control(null, Validators.required),
      bet: this.fb.control(null, Validators.required),
    });
  }

  next() {
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        exhaustMap((user) => {
          return this.storageService.addNewCargo({
            ...this.form.value,
            shipperId: user!.id,
          });
        }),
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
