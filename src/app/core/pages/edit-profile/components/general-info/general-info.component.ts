import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { OrganisationTypes, UserTaxTypes, UserTypes, ValueAddedTaxTypes } from 'src/app/core/enums/user-types.enum';
import { EditProfileValidationEvent } from '../../edit-profile.dto';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInfoComponent implements OnInit, OnDestroy{

  @Input() userType!: UserTypes;

  @Output() formValidated = new EventEmitter<EditProfileValidationEvent>();

  form!: UntypedFormGroup;

  organisationTypes = [OrganisationTypes.INDIVIDUAL, OrganisationTypes.LEGAL];

  taxTypes = [UserTaxTypes.COMMON, UserTaxTypes.PATENT, UserTaxTypes.SIMPLIFIED];

  vatTypes = [ValueAddedTaxTypes.HAS_VAT, ValueAddedTaxTypes.NO_VAT]

  destroyed$ = new Subject<void>();

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initSubscriptions() {
    this.form.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.formValidated.emit({isValid: this.form.valid, formValue: this.form.value});
      })
  }

  initForm() {
    this.form = this.fb.group({
      companyName: this.fb.control(null, Validators.required),
      companyOrganisationType: this.fb.control(null, Validators.required),
      companyTaxType: this.fb.control(null, Validators.required),
      companyVAT: this.fb.control(null, Validators.required),
      companyINN: this.fb.control(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      companyKPP: this.fb.control(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      companyORGN: this.fb.control(null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      companyATI: this.fb.control(null, [Validators.required]),

    })
  }
}
