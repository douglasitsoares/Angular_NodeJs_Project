import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService{
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;

  constructor( private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  //This responsible to emmit information of token is authenticated or not
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  //This return if token and authenticated is valid
  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(email: string, password: string){
   const authData: AuthData = {email:email, password:password};

    this.http.post("http://localhost:3000/api/user/signup", authData)
    .subscribe( response => {
      console.log(response);
    });
  }

  login (email: string, password: string){
    const authData: AuthData = {email:email, password:password};
    this.http.post<{token:string, expiresIn:number}>("http://localhost:3000/api/user/login", authData)
    .subscribe( response => {
      const token = response.token;
      this.token = token;
      //this token was authenticated
      if (token){
        const expiresInDuration = response.expiresIn;
        //console.log(expiresInDuration);
        this.tokenTimer = setTimeout(() => {this.logout()}, expiresInDuration * 1000);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }
    });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
}
