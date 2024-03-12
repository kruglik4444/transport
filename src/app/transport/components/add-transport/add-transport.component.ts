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
import { Subject, takeUntil } from 'rxjs';
import { TrailerTypes, TruckTypes } from 'src/app/core/enums/truck-types.enum';

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
    'R': { pattern: new RegExp('[А-Я]') },
    'N': { pattern: new RegExp('[0-9]') },
  };

  constructor(private fb: UntypedFormBuilder) {}

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
}
