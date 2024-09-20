import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { data, Datadetail, elementData } from '../data/datadetail';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

//Hiển thị danh sách data và chức năng tìm kiếm
export class FormComponent implements OnInit {
  p: number = 1; // Biến để lưu số trang hiện tại
  onPageChange(page: number) {
    this.p = page;
  }
  
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
    console.log(`data chon delete la: ${id}`);
    //Kiểm tra xem có nhấn vào nút Delete không
    this.CheckDelete = true;
    //Đưa mảng mới sau khi xóa vào dataAfter
    this.dataService.deleteData(id).subscribe(_ => {
      this.dataAfter = this.dataAfter.filter( (eachData) => eachData.id !== id )
    });
    console.log(`Mang sau khi xoa la: ${JSON.stringify(this.dataAfter)}`);
    //this.dataService.updateData(this.dataTest);
    this.successMessage();
  }

  //Tìm kiếm nâng cao
  advanceSearch(key: string, salary: number, location: string, remote: string) {
    this.CheckSearch = true;
    console.log(`Key la: ${salary}, ${remote}`);
    
    this.dataService.advanceSearchKey(key,salary,location,remote,false).subscribe(
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
    console.log(`test data: ${JSON.stringify(this.testdt)}`);
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
      this.dataService.orderBy(col,sort,this.CheckSearch).subscribe(
        (updateData) => {
          this.searchDataValue = updateData;
          console.log(`Key trong search la: ${JSON.stringify(updateData)}`);
        } 
      );
    }
    else {
      this.dataService.orderBy(col,sort,this.CheckSearch).subscribe(
        (Data) => {
          this.dataAfter = Data;
          console.log(`Key la: ${JSON.stringify(Data)}`);
        } 
      );
    }
  }

  ngOnInit(): void {
    this.dataService.getDataAfter().subscribe(
      (data) => {
        this.dataAfter = data;
        console.log(`Data new là: ${JSON.stringify(this.dataAfter)}`);
      }
    )
  }
}
