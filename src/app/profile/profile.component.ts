import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { ProfileInterface } from '../core/interfaces/common.interfaces';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { LoginService } from '../core/pages/login/login.service';
import { User } from '../core/models/user.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  company!: ProfileInterface;

  documentURL!: string;

  photoURL!: string;

  constructor(
    private storageService: StorageService,
    private storage: Storage,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.storageService
      .getProfileData()
      .subscribe((company: ProfileInterface) => {
        this.company = company;
        this.getImages();
      });
  }

  getImages() {
    const imagesRef = ref(this.storage, `companies/${this.company.userId}`);

    listAll(imagesRef).then(async (images) => {
      let photos = [];
      for (let image of images.items) {
        const url = await getDownloadURL(image);
        photos.push(url);
      }
      this.documentURL = photos[1];
      this.photoURL = photos[0];
    });
  }

  showDocument() {
    this.dialog.open(DialogPassport, {
      data: {
        passport: this.documentURL,
      },
    });
  }
}

@Component({
  selector: 'dialog-passport',
  template: `
    <div mat-dialog-actions align="end">
      <button mat-icon-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div class="tw-overflow-hidden">
      <img class="tw-max-w-[50vw]" src="{{ data.passport }}" />
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DialogPassport {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
