import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserTypes } from '../../enums/user-types.enum';
import {
  CompanyInfo,
  ContactInfoDTO,
  EditProfileValidationEvent,
  GeneralInfoDTO,
} from './edit-profile.dto';
import { Subject, takeUntil } from 'rxjs';
import {
  Storage,
  StorageReference,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent implements OnInit, OnDestroy {
  userTypesArray = [UserTypes.CARRIER, UserTypes.PRODUCER];

  form!: UntypedFormGroup;

  document!: File;

  userId!: string | undefined;

  generalFormValid = false;

  contactFormValid = false;

  destroyed$ = new Subject<void>();

  generalInfo!: GeneralInfoDTO;

  contactInfo!: ContactInfoDTO;

  constructor(
    private fb: UntypedFormBuilder,
    private storage: Storage,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
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
      userType: this.fb.control(null, Validators.required),
      companyRequsits: this.fb.control(null, Validators.required),
      companyRegistration: this.fb.control(null, Validators.required),
      companyInnAccount: this.fb.control(null, Validators.required),
    });
  }

  initSubscriptions() {
    this.loginService.user
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.userId = user?.id;
      });
  }

  generalInfoFormValidate(event: EditProfileValidationEvent) {
    this.generalFormValid = event.isValid;
    this.generalInfo = event.formValue;
  }

  contactInfoFormValidate(event: EditProfileValidationEvent) {
    this.contactFormValid = event.isValid;
    this.contactInfo = event.formValue;
  }

  onFileSelected(event: Event, type: string) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    let imgRef!: StorageReference;

    if (fileList) {
      this.document = fileList[0];
    }

    imgRef = ref(this.storage, `companies/${this.userId}/${type}`);

    uploadBytes(imgRef, this.document)
      .then((x) => {
        if (type === 'companyRequsits') {
          this.form.patchValue({ companyRequsits: this.document });
        }
        if (type === 'companyRegistration') {
          this.form.patchValue({ companyRegistration: this.document });
        }
        if (type === 'companyInnAccount') {
          this.form.patchValue({ companyInnAccount: this.document });
        }
        this.cdr.markForCheck();
      })
      .catch((error) => console.log(error));
  }

  next() {
    const companyData: CompanyInfo = {
      ...this.form.value,
      ...this.contactInfo,
      ...this.generalInfo,
      userId: this.userId,
    };
    this.loginService.registerNewUser(companyData, this.userId!).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }
}
