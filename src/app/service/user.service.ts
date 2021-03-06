import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {CustomHttpResponse} from "../model/custom-http-response/CustomHttpResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl

  constructor( private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email:string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,{
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUser(userId:number): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUserToLocalCache(users: User[]): void {
    localStorage.setItem('users',JSON.stringify(users));
  }

  public getUsersFromLocalCache():  User[] {
   if (localStorage.getItem('users')){
     return JSON.parse(localStorage.getItem('users') as string);
   }
   return [];
  }

  public createUserFormData(loggedInUserName:string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername',loggedInUserName);
    formData.append('nome',user.nome);
    formData.append('sobrenome',user.sobrenome);
    formData.append('username',user.username);
    formData.append('email',user.email);
    formData.append('profileImage',profileImage);
    formData.append('ativo',JSON.stringify(user.ativo));
    formData.append('bloqueado',JSON.stringify(user.bloqueado));
    return formData;
  }

}
