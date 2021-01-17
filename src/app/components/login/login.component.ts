import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AutheticationService} from "../../service/authetication.service";
import {User} from "../../model/User";
import {Subscription} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router:Router,
              private autheticationService:AutheticationService) { }

  ngOnInit(): void {
    if(this.autheticationService.isLoggedIn()){
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  public onLogin(user:User){
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
        this.autheticationService.login(user).subscribe(
            //TODO (response HttpResponse<User>) => {
            (response) => {
              const token = response.headers.get('Jwt-Token');
            }
        )
    )
  }

  ngOnDestroy(): void {
  }

}
