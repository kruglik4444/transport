import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TruckDTO, TruckInterface } from 'src/app/core/interfaces/common.interfaces';
import {
  Storage,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TruckListComponent implements OnInit {
  @Input() trucks!: TruckDTO;

  @Input() companyId!: string;

  trucksArray!: TruckInterface[];

  constructor(private storage: Storage, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    Promise.all(
      Object.keys(this.trucks).map(async (key) => {
        return Object.assign(this.trucks[key], {
          modelImage: await this.getImages(key),
        });
      }),
    ).then((arr) => {
      this.trucksArray = arr;
      this.cdr.markForCheck();
    });
  }

  getImages(truckId: string) {
    const imageRef = ref(
      this.storage,
      `companies/${this.companyId}/trucks/${truckId}`,
    );
    return getDownloadURL(imageRef);
  }
}