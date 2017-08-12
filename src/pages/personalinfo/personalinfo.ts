import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the PersonalinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personalinfo',
  templateUrl: 'personalinfo.html',
  providers: [UsersServiceProvider]
})
export class PersonalinfoPage {
  //variables for displaying info
  private userFname: any;
  private userLname: any;
  private userEmail: any;
  private userSex: any;
  private userNumber: any;
  private userUsername: any;
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private userservice: UsersServiceProvider,public alertCtrl: AlertController) {
   
     var myUserId = firebase.auth().currentUser.uid; //current user id
    this.displayUser(myUserId);
    this.showAlert(myUserId);

  }

    showAlert(ui) {
    let alert = this.alertCtrl.create({title:'hello my user id is: ' + ui});
    alert.present();
  }

  displayUser(theUserId){
    var that = this;
    this.userservice.viewUser(theUserId).then(snapshot => {
      that.userFname = snapshot.val().firstname;
      that.userLname = snapshot.val().lastname;
      that.userEmail = snapshot.val().email;
      that.userSex = snapshot.val().sex;
      that.userNumber = snapshot.val().number;
      that.userUsername = snapshot.val().username;
      

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalinfoPage');
  }



}
