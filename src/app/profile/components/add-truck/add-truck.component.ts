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
import { TrailerTypes, TruckTypes } from 'src/app/core/enums/truck-types.enum';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { LoginService } from 'src/app/core/pages/login/login.service';
import { Subject, takeUntil } from 'rxjs';
import { StorageService } from 'src/app/storage/storage.service';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTruckComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  truckTypes = Object.values(TruckTypes);

  trailerTypes = Object.values(TrailerTypes);

  userId!: string;

  document!: File;

  destroyed$ = new Subject<void>();

  isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
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
      model: this.fb.control(null, Validators.required),
      modelImage: this.fb.control(null, Validators.required),
      truckType: this.fb.control(null, Validators.required),
      trailerType: this.fb.control(null, Validators.required),
      trailerLift: this.fb.control(null, Validators.required),
      trailerSize: this.fb.control(null, Validators.required),
      truckDescription: this.fb.control(null, Validators.required),
    });
  }

  initSubscriptions() {
    this.loginService.user
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.userId = user!.id;
      });
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.document = fileList[0];
      this.form.patchValue({ modelImage: this.document });
      this.cdr.markForCheck();
    }
  }

  next() {
    this.isLoading = true;
    this.storageService
      .addNewTruck(this.form.value, this.userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        let imgRef = ref(
          this.storage,
          `companies/${this.userId}/trucks/${response.name}`,
        );
        uploadBytes(imgRef, this.document)
          .then(() => {
            this.isLoading = false;
            this.router.navigate(['/profile']);
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 5000,
              data: 'Машина успешно добавлена',
            });
          })
          .catch((error) => console.log(error));
      });
  }
}
