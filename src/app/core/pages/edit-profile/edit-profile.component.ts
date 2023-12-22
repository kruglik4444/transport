import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTypes } from '../../enums/user-types.enum';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  userTypesArray = [UserTypes.CARRIER, UserTypes.DRIVER, UserTypes.PRODUCER];

  userTypes = UserTypes;

  form!: UntypedFormGroup;

  userPhotoFile!: File;

  userId: string | undefined;

  private destroyed$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private storage: Storage,
    private loginService: LoginService
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
      userPassport: this.fb.control(null, Validators.required),
    });
  }

  initSubscriptions() {
    this.form.controls['userType'].valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      switch (value) {
        case UserTypes.CARRIER:
          this.addCarrierForm();
          break;
        case UserTypes.DRIVER:
          this.addDriverForm();
          break;
        case UserTypes.PRODUCER:
          this.addProducerForm();
          break;
      }
    })
  }

  addCarrierForm() {
    this.form.addControl('companyName', this.fb.control(null, Validators.required));
    this.form.addControl('companyINN', this.fb.control(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]));
    this.form.addControl('companyOGRN', this.fb.control(null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]));
    this.form.addControl('companyKPP', this.fb.control(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]));
  }

  addDriverForm() {

  }

  addProducerForm() {

  }

  onFileSelected(event: Event, type: string) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    let imgRef;

    if (fileList) {
      this.userPhotoFile = fileList[0];
    }

    if (type === 'photo') {
      imgRef = ref(this.storage, `users/${this.userId}/avatar`);
    } else {
      imgRef = ref(this.storage, `users/${this.userId}/document`);
    }

    uploadBytes(imgRef, this.userPhotoFile)
      .then((x) => {
        console.log(x);
        if (type === 'photo') {
          this.form.patchValue({ userPhoto: this.userPhotoFile });
        } else {
          this.form.patchValue({ userPassport: this.userPhotoFile });
        }
      })
      .catch((error) => console.log(error));
  }
}
