import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TrailerTypes, TruckTypes } from 'src/app/core/enums/truck-types.enum';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTruckComponent implements OnInit{

  form!: UntypedFormGroup;

  truckTypes = Object.values(TruckTypes);

  trailerTypes = Object.values(TrailerTypes);

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      model: this.fb.control(null, Validators.required),
      modelImage: this.fb.control(null, Validators.required),
      truckType: this.fb.control(null, Validators.required),
      trailerType: this.fb.control(null, Validators.required),
      trailerLift: this.fb.control(null, Validators.required),
      trailerSize: this.fb.control(null, Validators.required),
    })
  }

  next() {
  }
}
