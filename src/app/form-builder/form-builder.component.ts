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
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  showFiller = false;
  @Output() toggleSideBarFoeMe: EventEmitter<any> = new EventEmitter();
  constructor(private dialog: MatDialog, private api: ApiService) {}
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
    this.getAllProduct();
  }
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
