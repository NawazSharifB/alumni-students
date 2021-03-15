import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';
import { InfoListModel } from 'src/app/models/info-list.model';

// TODO: Replace this with your own data model type
export interface MainLogItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: InfoListModel[] = [
  {firstName: 'Nawaz',
  imageUrl: 'https://storage.googleapis.com/student-log-46a08.appspot.com/profile-image/e832d4ea-b1a8-463d-bdf0-053d88ac6eb0%7C1605915930038?GoogleAccessId=firebase-adminsdk-wwpfr%40student-log-46a08.iam.gserviceaccount.com&Expires=16446996000&Signature=XAZS6KQXVsOebdUV9%2Bx8TneuWygue5LvpIlLSyhMpyvpDtJWPOuBbW3QPVXjkCwzYH8JY8y1PntHFzLumshBtHDiYUATALKhCLIYXY8p%2F8ePpmfWstELMB37sRFepv2jXw57bp1V0UeF38yfEbdrMP4YIbJ%2BDaSaEkWhyphkT5TLBdKcHfmyq9m2xSesGmbxmm94zydWqjhC2X7ynuBFvVrxi8EwEd%2F7EKsFK06SUNtRt8nAZuXz%2F%2F3IAzshNW0CokWwaNjLW6vm3K8CZfEIZEyrWJ96P6AHWdlQxs3EpLIJHIRDkXpmTIpmWeGS%2BkNb85GZS3F5geUL0KreDsU3DA%3D%3D',
  institute: 'Xyz Institute, Bangladesh',
  lastName: 'Bishal',
  occupation: 'Web Developer',
  uid: '4bht45WBhcDGqYsVzUsM'},
  {firstName: 'Nawaz',
  imageUrl: 'https://storage.googleapis.com/student-log-46a08.appspot.com/profile-image/e832d4ea-b1a8-463d-bdf0-053d88ac6eb0%7C1605915930038?GoogleAccessId=firebase-adminsdk-wwpfr%40student-log-46a08.iam.gserviceaccount.com&Expires=16446996000&Signature=XAZS6KQXVsOebdUV9%2Bx8TneuWygue5LvpIlLSyhMpyvpDtJWPOuBbW3QPVXjkCwzYH8JY8y1PntHFzLumshBtHDiYUATALKhCLIYXY8p%2F8ePpmfWstELMB37sRFepv2jXw57bp1V0UeF38yfEbdrMP4YIbJ%2BDaSaEkWhyphkT5TLBdKcHfmyq9m2xSesGmbxmm94zydWqjhC2X7ynuBFvVrxi8EwEd%2F7EKsFK06SUNtRt8nAZuXz%2F%2F3IAzshNW0CokWwaNjLW6vm3K8CZfEIZEyrWJ96P6AHWdlQxs3EpLIJHIRDkXpmTIpmWeGS%2BkNb85GZS3F5geUL0KreDsU3DA%3D%3D',
  institute: 'Xyz Institute, Bangladesh',
  lastName: 'Bishal',
  occupation: 'Web Developer',
  uid: '4bht45WBhcDGqYsVzUsM'},
  {firstName: 'Nawaz',
  imageUrl: 'https://storage.googleapis.com/student-log-46a08.appspot.com/profile-image/e832d4ea-b1a8-463d-bdf0-053d88ac6eb0%7C1605915930038?GoogleAccessId=firebase-adminsdk-wwpfr%40student-log-46a08.iam.gserviceaccount.com&Expires=16446996000&Signature=XAZS6KQXVsOebdUV9%2Bx8TneuWygue5LvpIlLSyhMpyvpDtJWPOuBbW3QPVXjkCwzYH8JY8y1PntHFzLumshBtHDiYUATALKhCLIYXY8p%2F8ePpmfWstELMB37sRFepv2jXw57bp1V0UeF38yfEbdrMP4YIbJ%2BDaSaEkWhyphkT5TLBdKcHfmyq9m2xSesGmbxmm94zydWqjhC2X7ynuBFvVrxi8EwEd%2F7EKsFK06SUNtRt8nAZuXz%2F%2F3IAzshNW0CokWwaNjLW6vm3K8CZfEIZEyrWJ96P6AHWdlQxs3EpLIJHIRDkXpmTIpmWeGS%2BkNb85GZS3F5geUL0KreDsU3DA%3D%3D',
  institute: 'Xyz Institute, Bangladesh',
  lastName: 'Bishal',
  occupation: 'Web Developer',
  uid: '4bht45WBhcDGqYsVzUsM'}
];

/**
 * Data source for the MainLog view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MainLogDataSource extends DataSource<InfoListModel> {
  data: InfoListModel[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;


  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InfoListModel[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return of(this.data);
    // const dataMutations = [
    //   of(this.data),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];
    

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MainLogItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MainLogItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
