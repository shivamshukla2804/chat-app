import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX, ACCOUNT_ERROR_MESSAGES } from '../../../constant/regex';
import { CHAT } from '../../../constant/routes';
import { CommonService } from '../../../services/common/common.service';
import { SocketService } from '../../../services/socket/socket.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  errorMsg = ACCOUNT_ERROR_MESSAGES;
  isUser = false;

  constructor(
    private socketService: SocketService,
    private _fb: FormBuilder,
    private _router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.createForm();
    this.socketService.setupSocketConnection();
  }

  createForm() {
    this.loginForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern(REGEX.FULLNAME)]],
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    });
  }

  get frmCtrl() {
    return this.loginForm.controls;
  }

  isUserAvailable() {
    this.socketService.isUserAlredayExist().subscribe((data: any) => {
      console.log(data, 'isUserAvailable!');
      if (data.isUserAvailable) {
        this._router.navigate([CHAT.fullUrl]);
      } else {
        this.commonService.snackBar(
          'User with this email already exist!',
          'Close',
          'red-snackbar'
        );
      }
    });
  }

  onSubmit() {
    console.log();
    if (!this.socketService.socket.connected) {
      this.commonService.snackBar(
        'Something went wrong',
        'Close',
        'red-snackbar'
      );
      return;
    }
    if (this.loginForm.valid) {
      this.commonService.setUserData(this.loginForm.value);
      this.socketService.registerUser(this.commonService.getUserData);
      this.isUserAvailable();
    }
  }

  loginWithGoogle() {}
}
