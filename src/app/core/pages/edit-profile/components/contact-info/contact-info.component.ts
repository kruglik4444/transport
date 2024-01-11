import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EmailValidator, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EditProfileValidationEvent } from '../../edit-profile.dto';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent implements OnInit, OnDestroy{

  @Output() formValidated = new EventEmitter<EditProfileValidationEvent>();

  form!: UntypedFormGroup;

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

  initForm() {
    this.form = this.fb.group({
      companyCountry: this.fb.control(null, Validators.required),
      companyCity: this.fb.control(null, Validators.required),
      companyPhone: this.fb.control(null, Validators.required),
      companyEmail: this.fb.control(null, [Validators.required, Validators.email]),
    })
  }

  initSubscriptions() {
    this.form.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.formValidated.emit({isValid: this.form.valid, formValue: this.form.value});
      })
  }
}
