import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { data, Datadetail, elementData } from '../data/datadetail';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  p: number = 1; // Biến để lưu số trang hiện tại
  onPageChange(page: number) {
    this.p = page;
  }

  NewData: Datadetail[] = [];
  
  //Data ban đầu
  dataAfter: Datadetail[] = [];

  //Data check
  dataTest: Datadetail[] = [];

  testdt = elementData;

  constructor (
    private dataService: DataService,
    private router: Router)
  {}
  //List Data tìm được khi search
  searchDataValue: Datadetail[] = [];
  CheckSearch: boolean = false;
  CheckDelete: boolean = false;
  CheckFavorite: boolean = false;
  
  //Xóa data
  delete(id: number) {
    //Kiểm tra xem có nhấn vào nút Delete không
    this.CheckDelete = true;
    this.dataService.deleteData(id).subscribe(
      (data) => this.dataTest = data
    );
    this.dataService.updateDataFavorite(this.dataTest);
    this.successMessage();
  }

  //Tìm kiếm nâng cao
  advanceSearch(key: string, salary: number, location: string, remote: string) {
    this.CheckSearch = true;
    console.log(`Key la: ${salary}, ${remote}`);
    
    this.dataService.advanceSearchKey(key,salary,location,remote,true).subscribe(
      (updateData) => {
        this.searchDataValue = updateData;
        console.log(`Key la: ${JSON.stringify(updateData)}`);
      } 
    );
  }
  
  favorite(id: number, favorite: boolean) {
    this.dataService.favoriteData(id).subscribe(
      (data) => this.testdt = data
    );
    this.dataService.updateDataNew(this.testdt).subscribe(
      (data) => this.testdt = data
    );
    console.log(`ID favorite: ${id}, ${favorite}`);
  }

  stringToNumber(value: string): number {
    const num = parseInt(value);
    if (isNaN(num)) {
      return 0;
    }
    return num;
  }

  successMessage(): void {
    this.router.navigate(['/success']);
  }

  selectedOrder: string = '1';
  sortOrder: string = 'cao';

  orderBy(col: string, sort: string): void {
    console.log(`search chua: ${this.CheckSearch}`);
    if(this.CheckSearch) {
      console.log(`data searchDatavalue: ${JSON.stringify(this.searchDataValue)}`);
      this.dataService.orderByFavorite(col,sort,this.CheckSearch).subscribe(
        (updateData) => {
          this.searchDataValue = updateData;
          console.log(`Key trong search la: ${JSON.stringify(updateData)}`);
        } 
      );
    }
    else {
      this.dataService.orderByFavorite(col,sort,this.CheckSearch).subscribe(
        (Data) => {
          this.dataAfter = Data;
          console.log(`Key la: ${JSON.stringify(Data)}`);
        } 
      );
    }
  }


  ngOnInit(): void {

    this.dataService.getSubObservable().subscribe(
      (data) => this.dataAfter = data
    )
  }
}
