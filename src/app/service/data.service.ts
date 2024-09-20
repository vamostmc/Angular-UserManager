import { Injectable } from '@angular/core';
import { Datadetail, data, elementData } from '../data/datadetail';

//Import bien khong dong bo 
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { application } from 'express';
import { tap, catchError } from 'rxjs/operators';

const httpOption = {
  header: new HttpHeaders({ 'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

//Module lay data
export class DataService {
  datas: Datadetail[] = [];
  dataSearch : Datadetail[] = [];

  constructor(private http: HttpClient) {  this.loadInitialData();  }

  //Lấy data từ http trước sau đó cập nhật ở danh sách yêu thích
  private loadInitialData() {
    this.getDataAfter().subscribe(data => {
      this.datas = data;
      this.dataFavorite.next(this.getDataFavorite(this.datas));
    });
  }

  private dataURL = "http://localhost:3000/Datadetail";

  //Thêm dữ liệu
  addData(data: Datadetail): Observable<Datadetail> {
    console.log(`New Data added: ${JSON.stringify(data)}`);
    const dataNew = {
      ...data, id: data.id.toString()
    }
    return this.http.post<Datadetail>(this.dataURL, dataNew);
  }

  //Tìm kiếm nâng cao trong data gốc 
  advanceSearchKey(key: string, salary: number, location: string, remote: string, checkKey: boolean): Observable<Datadetail[]> {
    let datatoSearch: Datadetail[] = [];
    if(!checkKey) {
      //Trường hợp tìm trong data gốc
      datatoSearch = this.datas;
    }
    //Trường hợp tìm trong data danh mục yêu thích
    else datatoSearch = this.getDataFavorite(this.datas);
    const check = datatoSearch.filter(
      (data) => { 
        const keyMatch = data.Name.toLowerCase().includes(key.toLowerCase());
        const salaryMatch = (salary === 0 || (data.Salary > salary && data.Salary <= salary + 5000000  && salary > 2000000) || (salary === 2000000 && data.Salary < 2000000)) ;
        const locationMatch = (location === '' || data.Location === location);
        const remoteMatch = (remote === '' || remote === data.Remote);
        return salaryMatch && locationMatch && remoteMatch && keyMatch;
      }
    );
    this.dataSearch = check;
    return of(check);
  }

  dataFavorite = new BehaviorSubject<Datadetail[]>([]);

  //Đưa về dạng Observable từ BehaviorSubject
  getSubObservable(): Observable<Datadetail[]> {
    return this.dataFavorite.asObservable();
  }

  //cập nhật giá trị hiện tại của BehaviorSubject
  updateDataFavorite(newData: Datadetail[]) {
    this.dataFavorite.next(newData); 
    console.log(`Data Subject: ${JSON.stringify(newData)}`);
  }

  //Lấy data danh sách yêu thích
  getDataFavorite(newData: Datadetail[]): Datadetail[] {
    let check = newData.filter(data => data.Favorite === true);
    console.log(`Mang datas là: ${JSON.stringify(check)}`);
    return check;
  }
  
  //Chọn data yêu thích và update lại dữ liệu
  favoriteData(id: number): Observable<Datadetail> {
    let elementDT = elementData
    this.datas.forEach(data => {
        if (data.id === id) {
            elementDT = data;
            data.Favorite = !data.Favorite; // Đảo ngược giá trị của thuộc tính favorite
        }
    });
    this.updateDataFavorite(this.getDataFavorite(this.datas));
    console.log(`Mang datas là: ${JSON.stringify(elementDT)}`);
    return of(elementDT);
  }

  //Sắp xếp theo mục 
  orderBy(key: string, sort: string, checkSearch: boolean):Observable<Datadetail[]>  {
    let dataOrderBy: Datadetail[] = [];
    if(checkSearch) {
      dataOrderBy = this.dataSearch;
    }
    else {dataOrderBy = this.datas;}
   
    console.log(`Data truyen vao oderBy la: ${key}, ${sort}`);
    if(sort === 'thap') {
      if(key === '1') {
        const check = dataOrderBy.sort((a,b) => b.id - a.id);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      if(key === '2') {
        const check = dataOrderBy.sort((a,b) => b.Salary - a.Salary);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      else {
        const check = dataOrderBy.sort((a,b) => b.Date - a.Date);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
    }
    else {
      if(key === '1') {
        const check = dataOrderBy.sort((a,b) => a.id - b.id);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      if(key === '2') {
        const check = dataOrderBy.sort((a,b) => a.Salary - b.Salary);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      else {
        const check = dataOrderBy.sort((a,b) => a.Date - b.Date);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
    }
  }

  //Sắp xếp trong danh sách yêu thích
  orderByFavorite(key: string, sort: string, checkSearch: boolean):Observable<Datadetail[]>  {
    let dataOrderBy: Datadetail[] = [];
    if(checkSearch) {
      dataOrderBy = this.dataSearch;
    }
    else {dataOrderBy = this.getDataFavorite(this.datas);}
   
    console.log(`Data truyen vao oderBy la: ${key}, ${sort}`);
    if(sort === 'thap') {
      if(key === '1') {
        const check = dataOrderBy.sort((a,b) => b.id - a.id);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      if(key === '2') {
        const check = dataOrderBy.sort((a,b) => b.Salary - a.Salary);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      else {
        const check = dataOrderBy.sort((a,b) => b.Date - a.Date);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
    }
    else {
      if(key === '1') {
        const check = dataOrderBy.sort((a,b) => a.id - b.id);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      if(key === '2') {
        const check = dataOrderBy.sort((a,b) => a.Salary - b.Salary);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
      else {
        const check = dataOrderBy.sort((a,b) => a.Date - b.Date);
        console.log(`mang la: ${JSON.stringify(check)}`);
        return of(check);
      }
    }
  }
  
  //Lấy data gốc từ http
  getDataAfter(): Observable<Datadetail[]> {
    return this.http.get<Datadetail[]>(this.dataURL).pipe(
      tap((data) => this.datas = data)
    );
  }

  //Cập nhật giá trị lại data gốc
  updateDataNew(Data : Datadetail): Observable<Datadetail> {
    const urlid = `${this.dataURL}/${Data.id}`;
    console.log(`URL gọi là: ${urlid}`);
    return this.http.put<Datadetail>(urlid, Data);
  }

  //Lấy đối tượng chứa id cần tìm
  getDataFromID(id: number): Observable<Datadetail> {
    const urlid = `${this.dataURL}/${id}`;
    console.log(`URL gọi là: ${urlid}`);
    return this.http.get<Datadetail>(urlid);
  }

  //Thêm data vào trên http
  PostData(Datanew: Datadetail): Observable<Datadetail> {
    return this.http.post<Datadetail>(this.dataURL, Datanew);
  }

  //Xóa data trên http
  deleteData(id: Number): Observable<Datadetail[]> {
    console.log(`data truyen vao trong service la: ${id}`);
    const deleteURL = `${this.dataURL}/${id}`;
    //this.datas = this.datas.filter(data => data.id !== id);
    //console.log(`New Data: ${JSON.stringify(this.datas)}`);
    return (this.http.delete<Datadetail[]>(deleteURL));
  }  
}
