import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersServiceProvider {
private data:any;
public fireAuth:any;
public userProfile:any;
  constructor(public http: Http) {
  this.fireAuth=firebase.auth();
  this.userProfile=firebase.database().ref('users');

  }
  loadUser(){
  if(this.data){
  return Promise.resolve(this.data);
  }
  return new Promise(resolve => {
  this.http.get('https://randomuser.me/api/?results=2')
   .map(res => res.json())
   .subscribe(data => {
      this.data= data.results;
      resolve(this.data);
   })
  })

  }
  loadjsonUsers(url: string){
  if(this.data){
  return Promise.resolve(this.data);
  }
  return new Promise(resolve => {
  this.http.get(url)
   .map(res => res.json())
   .subscribe(data => {
      this.data= data.results;
      resolve(this.data);
   })
  })

  }
  signupUser(email: string,password: string){
  return this.fireAuth.createUserWithEmailAndPassword(email,password).then((newUser)=>{
  this.fireAuth.signInWithEmailAndPassword(email,password).then((authenticatedUser)=>{
  this.userProfile.child(authenticatedUser.uid).set({email:email});
  });
  });
  }
 // addUsers(email: string,password: string,number:any,username: any,firstname: string,lastname: string,sex: any){
 // return this.fireAuth.createUserWithEmailAndPassword(email,password).then((authenticatedUser)=>{
  //this.userProfile.child(authenticatedUser.uid).set({email:email,number:number,username:username,firstname:firstname,lastname:lastname,sex:sex});
  //});
  //}


  loginUser(email: string, password: string): any{
  return this.fireAuth.signInWithEmailAndPassword(email,password);

  }
  logoutUser(){
  return this.fireAuth.signOut();
  }

  //method for viewing user used in personal info page
  viewUser(userId: any){
    var UserRef = this.userProfile.child(userId);

    return UserRef.once('value');
  }

}
