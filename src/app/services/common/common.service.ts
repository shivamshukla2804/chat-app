import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userData:any = {};

  constructor(private _snackBar: MatSnackBar) { }

  setUserData(data:any){
    this.userData={
      id:this.generateUid(),
      name:data.name,
      email:data.email,
      status:this.formatAMPM(new Date)
    }
    console.log(this.userData,"set data!");

  }

  get getUserData(){
    return this.userData;
  }

  snackBar(message: any, action: string, theme: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [theme],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  formatAMPM(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  generateUid() {
    const length = 5;
    const randomNo = Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
    return randomNo;
  }

}
