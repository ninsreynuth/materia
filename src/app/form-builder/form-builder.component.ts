import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../dialog/service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  showFiller = false;
  @Output() toggleSideBarFoeMe: EventEmitter<any> = new EventEmitter();
  posts: any;
  // private url = 'http://localhost:3000/users';

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private http: HttpClient
  ) {
    // http.get(this.url).subscribe((Response) => {
    //   this.posts = Response;
    // });
  }

  ngAfterViewInit() {
    // this.observer.observe(['(max-width:800px)']).subscribe((res) => {
    //   if (res.matches) {
    //     this.Sidenav.mode = 'over';
    //     this.Sidenav.close();
    //   } else {
    //     this.Sidenav.mode = 'side';
    //     this.Sidenav.close();
    //   }
    // });
  }
  toggleSideBar() {
    this.toggleSideBarFoeMe.emit();
  }
  displayedColumns: string[] = [
    'productName',
    'category',
    'freshness',
    'price',
    'comment',
    'date',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // signUp storage and remove
    const userName = localStorage.getItem('userName');
    if (userName == null) {
      localStorage.removeItem('userName');
      alert('User not login');
      this.router.navigate(['/form-login']);
    }
    // get product
    this.getAllProduct();
    const users = localStorage.getItem('users');
    if (users === null) {
    }
  }
  // open Dialog
  openDialog() {
    this.dialog
      .open(DialogComponent, { width: '30%' })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllProduct();
        }
      });
  }
  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (res) => {
        alert('error while fetching the record! ');
      },
    });
  }
  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getAllProduct();
        }
      });
  }
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Your delete is successfully');
        this.getAllProduct();
      },
      error: () => {
        alert('error while deleting this product!');
      },
    });
  }
  // applyFilter search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // LogOut
  logout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/form-login']);
  }
}
