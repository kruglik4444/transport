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
  ref,
} from '@angular/fire/storage';
import { Router } from '@angular/router';

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

  constructor(private storage: Storage, private cdr: ChangeDetectorRef, private router: Router) {}

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

  addNewTruck() {
    this.router.navigate(['/profile/add-truck'])
  }

}
