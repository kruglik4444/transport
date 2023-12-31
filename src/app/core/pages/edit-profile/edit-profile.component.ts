import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTaxTypes, UserTypes } from '../../enums/user-types.enum';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  userTypesArray = [UserTypes.CARRIER, UserTypes.PRODUCER];

  userTaxTypesArray = [
    UserTaxTypes.COMMON,
    UserTaxTypes.PATENT,
    UserTaxTypes.SIMPLIFIED,
  ];

  userTaxTypes = UserTaxTypes;

  userTypes = UserTypes;

  form!: UntypedFormGroup;

  userPhotoFile!: File;

  userId: string | undefined;

  private destroyed$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private storage: Storage,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
    this.loginService.user
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.userId = user?.id;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      userType: this.fb.control(null, Validators.required),
      userPhoto: this.fb.control(null, Validators.required),
      userDocument: this.fb.control(null, Validators.required),
    });
  }

  initSubscriptions() {
    this.form.controls['userType'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (value === UserTypes.CARRIER) {
          this.addCarrierForm();
        } else {
          this.addProducerForm();
        }
      });
  }

  addCarrierForm() {
    this.addLegalTypeForm();
  }

  addProducerForm() {
    this.addLegalTypeForm();
  }

  addLegalTypeForm() {
    this.form.addControl(
      'companyName',
      this.fb.control(null, Validators.required)
    );
    this.form.addControl(
      'companyINN',
      this.fb.control(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
      ])
    );
    this.form.addControl(
      'companyOGRN',
      this.fb.control(null, [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
      ])
    );
    this.form.addControl(
      'companyKPP',
      this.fb.control(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ])
    );
    this.form.addControl(
      'companyAddress',
      this.fb.control(null, Validators.required)
    );
    this.form.addControl(
      'companyTaxType',
      this.fb.control(null, Validators.required)
    );
    this.form.addControl(
      'companyPhone',
      this.fb.control(null, Validators.required)
    );
  }

  onFileSelected(event: Event, type: string) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    let imgRef;

    if (fileList) {
      this.userPhotoFile = fileList[0];
    }

    if (type === 'photo') {
      imgRef = ref(this.storage, `companies/${this.userId}/avatar`);
    } else {
      imgRef = ref(this.storage, `companies/${this.userId}/document`);
    }

    uploadBytes(imgRef, this.userPhotoFile)
      .then((x) => {
        console.log(x);
        if (type === 'photo') {
          this.form.patchValue({ userPhoto: this.userPhotoFile });
        } else {
          this.form.patchValue({ userDocument: this.userPhotoFile });
        }
      })
      .catch((error) => console.log(error));
  }

  next() {
    const userData = { ...this.form.value, userId: this.userId };
    this.loginService.registerNewUser(userData, this.userId!).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }
}
