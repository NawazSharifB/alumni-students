import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { InfoListModel } from './../../models/info-list.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MainLogDataSource, MainLogItem } from './main-log-datasource';
import { BehaviorSubject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-main-log',
  templateUrl: './main-log.component.html',
  styleUrls: ['./main-log.component.scss']
})
export class MainLogComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MainLogItem>;
  searchInput: FormControl;

  initialInfo: InfoListModel[] = [
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

  info = new BehaviorSubject<InfoListModel[]>(this.initialInfo);

  paginationOptions = {
    sortBy: 'firstName',
    sortDirection: 'asc',
    pageSize: 5,
    pageIndex: 0,
    dataLength: 20,
    previousPage: false,
    searchBy: ''
  };
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['profileImage', 'firstName', 'occupation', 'institute', 'details'];
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchData();
    this.searchInput = new FormControl('', Validators.maxLength(30));

  }

  fetchData(): void {
    this.notificationService.showPageBlocker.next(true);
    this.userService.getInfoList(this.paginationOptions).subscribe( (data: {data: InfoListModel[], dataLength: number}) => {
      this.info.next(data.data);
      this.paginationOptions.dataLength = data.dataLength;
      if (this.paginationOptions.searchBy &&
          data.dataLength < (this.paginationOptions.pageIndex * this.paginationOptions.pageSize)) {

          this.paginator.firstPage();
      }
      // console.log(data);
      this.notificationService.showPageBlocker.next(false);
    }, error => {
      // console.log(error);
      this.notificationService.showPageBlocker.next(false);
    });
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page,
      this.searchInput.valueChanges.pipe(debounceTime(500), distinctUntilChanged())).subscribe(( data: any ) => {
      // console.log(data);
      if (data.active) {
        if (data.direction) {
          // console.log('sorting');
          this.paginationOptions.sortBy = data.active;
          this.paginationOptions.sortDirection = data.direction;
          this.paginationOptions.previousPage = false;
        } else {
          this.paginationOptions.sortBy = 'firstName';
          this.paginationOptions.sortDirection = 'asc';
          this.paginationOptions.previousPage = false;
        }
      } else if (data.pageSize) {
        // console.log('paginating');
        this.paginationOptions.pageSize = data.pageSize;
        if (data.previousPageIndex > data.pageIndex) {
          this.paginationOptions.previousPage = true;
        } else {
          this.paginationOptions.previousPage = false;
        }
        this.paginationOptions.pageIndex = data.pageIndex;
      } else {
        // console.log('searching');
        // console.log(data);
        this.paginationOptions.searchBy = data;
      }

      this.fetchData();
    });
  }

  goFullInfo(uid: string): void {
    // console.log(uid);
    this.router.navigate(['/full-info', uid]);
  }


}
