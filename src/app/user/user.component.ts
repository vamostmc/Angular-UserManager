import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Datadetail, data, elementData } from '../data/datadetail';
import { FormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, NavigationEnd, NavigationStart  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

//Error
import { dateValidator } from '../custom-validator/noSpace';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

//Chức năng edit và add 
export class UserComponent implements OnInit {

  constructor (
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  //Biến dữ liệu input lấy từ form người dùng
  IDForm !: number;
  nameForm : string = '';
  dateForm : number = 0;
  salaryForm : number = 0;
  locationForm : string = '';
  remoteForm: string = '';
  favoriteForm: boolean = false;

  //Biến để đọc đường dẫn path url
  currentPath: string = '';

  //Data ban đầu
  datas = data;

  //Data gốc từ cập nhật từ service
  NewData : Datadetail[] = [];

  testdt = elementData;

  //Data khi chọn để edit
  editDataCheck : Datadetail[] = [];

  //Điều kiện xem url đang ở trang nào
  CheckAdd: boolean = false;

  //Điều kiện chỉ chứa các số
  patternNum = '^[0-9]*$';

  //Điều kiện chỉ chứa các kí tự chữ và khoảng trắng
  patternString = '^[a-zA-Z\\s]*$';

  //Form cho add Data
  signInForm = this.fb.group({
    Name: ['', Validators.compose([
      Validators.required,
      Validators.pattern(this.patternString)
    ])],
    Date: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.patternNum),
      dateValidator(),
    ])],
    Salary: ['', Validators.compose([
      Validators.required,
      Validators.pattern(this.patternNum),
    ])],
    Location: ['', Validators.compose([
      Validators.required,
    ])],
    Remote: ['false', Validators.compose([
      Validators.required,
    ])],
  });

  //Form cho edit data
  otherForm = this.fb.group({
    ID: [{ value: '', disabled: true }],
    Name: ['', Validators.compose([
      Validators.required,
      Validators.pattern(this.patternString)
    ])],
    Date: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.patternNum),
      dateValidator(),
    ])],
    Salary: ['', Validators.compose([
      Validators.required,
      Validators.pattern(this.patternNum),
    ])],
    Location: ['', Validators.compose([
      Validators.required,
    ])],
    Remote: ['false', Validators.compose([
      Validators.required,
    ])],
  });

  resetData(): void {
    this.signInForm.reset();
    this.signInForm.controls.Remote.setValue('false');
    this.signInForm.controls.Location.setValue('');
  }

  add(): void {
    //Lấy data từ view
    this.nameForm = this.signInForm.controls.Name.value || '';
    this.dateForm = parseInt(this.signInForm.controls.Date.value || '');
    this.salaryForm = parseInt(this.signInForm.controls.Salary.value || '');
    this.locationForm = this.signInForm.controls.Location.value || '';
    this.remoteForm = "false";
    
    console.log(`Data old: ${JSON.stringify(this.datas)}`);

    //Thêm data vào list
    const newData = new Datadetail(this.nameForm,this.dateForm,this.salaryForm,this.locationForm,this.remoteForm,this.favoriteForm);
    newData.Name = this.nameForm;
    newData.Date = this.dateForm;
    newData.Salary = this.salaryForm;
    newData.Location = this.locationForm;
    newData.Remote = this.remoteForm;
    newData.Favorite = this.favoriteForm;
    this.dataService.addData(newData).subscribe(
      (data) => { 
          this.datas.push(data);
      }
    );
    this.resetData();
    this.successMessage();
  }

  selectID(id: number): void {
  console.log(`Tao da nhan duoc id la: ${id}`);
  this.IDForm = id;
  
  this.dataService.getDataFromID(id).subscribe(
    (data) => {
        console.log(`Date lấy từ get: ${JSON.stringify(data)}`);
        this.testdt = (data);
        // Đưa đến hàm hiển thị data cần edit sau khi dữ liệu được tải về
        this.loadDetailToEdit();
    });
  }

  edit(): void {
    //Lấy data sau khi edit từ form
    this.nameForm = this.otherForm.controls.Name.value || '';
    this.dateForm = parseInt(this.otherForm.controls.Date.value || '');
    this.salaryForm = parseInt(this.otherForm.controls.Salary.value || '');
    this.locationForm = this.otherForm.controls.Location.value || '';
    this.remoteForm = (this.otherForm.controls.Remote.value || '');
    this.favoriteForm = false;

    let dataEdit: Datadetail = {
      id: this.IDForm,
      Name : this.nameForm,
      Date : this.dateForm,
      Salary: this.salaryForm,
      Location: this.locationForm,
      Remote : this.remoteForm,
      Favorite: this.favoriteForm
    };
    console.log(`Data lay tu Form la: ${JSON.stringify(dataEdit)}`);
    //Chuyển data vừa được edit đến service để update
    this.dataService.updateDataNew(dataEdit).subscribe(
      (data) => {
        this.testdt = data
        this.successMessage();
      }
    );
    console.log(`Data after Edit: ${JSON.stringify(this.testdt)}`); 
  }

  //Hiển thị data để edit
  loadDetailToEdit():void {
      const details = this.testdt; 
      //const details = this.editDataCheck[0];
      if (details) {
        this.otherForm.setValue({
          ID: String(this.IDForm),
          Name: details.Name,
          Date: String(details.Date),
          Salary: String(details.Salary),
          Location: String(details.Location),
          Remote: String(details.Remote)
        });
        console.log(`Details là: ${JSON.stringify(details)}`); 
      }
      else 
        console.log(`Không tìm thấy ID được chọn`);
  }

  //Kiểm tra xem đường url có phải Add Data không 
  //true là Add, false là Edit
  isAddPath(): boolean {
    return this.currentPath === '/add';
  }
  
  //Từ url Edit/id thì chuyển thành id trả về
  FindID(urlEdit: string): number {
    if (urlEdit) {
      const segments = urlEdit.split('/');
      const idSegment = segments.find(segment => !isNaN(parseInt(segment, 10)));
      if (idSegment) {
        return parseInt(idSegment, 10);
      } else {
        console.error('ID not found in the URL.');
        return 0; 
      }
    }
    console.log(`Khong thay`);
    return 0; 
  }

  successMessage(): void {
    this.router.navigate(['/success']);
  }

  currentID: number =  0;

  ngOnInit(): void {
    this.currentPath = this.router.url;
    
    //Cập nhật data gốc từ service 
    this.dataService.getDataAfter().subscribe(
      (data) => {
        this.NewData = data;
        console.log(`Data lúc này NewData là: ${JSON.stringify(this.NewData)}`);
      } 
    );

    // Theo dõi thay đổi tham số ID trong URL
    if (!this.isAddPath()) {
        this.route.params.subscribe(params => {
          this.currentID = parseInt(params['id']);  
          console.log(`current id là: ${this.currentID}`);
          this.selectID(this.currentID);
          console.log(`ID hiện tại là: ${this.currentID}`);
      });
    }
  }
}
