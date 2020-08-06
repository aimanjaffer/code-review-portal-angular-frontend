import { Component, OnInit } from '@angular/core';
import { User } from '../data/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  initUser: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    groups: null
  };
  user: User = {...this.initUser};
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    // console.log('form submitted by ' + this.user.email);
    this.userService.setUserEmail(this.user.email);
    this.router.navigateByUrl('/home');
  }

}
