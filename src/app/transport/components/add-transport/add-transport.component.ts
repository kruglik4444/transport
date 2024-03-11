import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TruckTypes } from 'src/app/core/enums/truck-types.enum';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransportComponent implements OnInit, OnDestroy{

  form!: UntypedFormGroup;

  destroyed$ = new Subject<void>();

  truckTypes = Object.values(TruckTypes);

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
    })
  }

  initSubscriptions() {
    this.form.controls['truckType'].valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      console.log(this.form);
    })
  }
}
