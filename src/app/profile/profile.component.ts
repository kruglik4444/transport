import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { ProfileInterface } from '../core/interfaces/common.interfaces';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  company!: ProfileInterface;

  documentURLs: string[] = [];

  constructor(
    private storageService: StorageService,
    private storage: Storage,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
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
      for (let image of images.items) {
        const url = await getDownloadURL(image);
        this.documentURLs.push(url);
      }
      this.cdr.markForCheck();
    });
  }

  showDocument(index: number) {
    this.dialog.open(DialogPassport, {
      data: {
        img: this.documentURLs[index],
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
      <img class="tw-max-w-[50vw]" src="{{ data.img }}" />
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DialogPassport {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
