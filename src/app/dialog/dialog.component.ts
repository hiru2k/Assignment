import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

 userForm !:FormGroup;
 actionBtn : string="Register"
 hide: any;

  constructor(private formBuilder : FormBuilder, private api:ApiService,
             @Inject(MAT_DIALOG_DATA) public editData:any,
    
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      password:['',Validators.required]

    });
    if(this.editData){
      this.actionBtn ="Update"
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['firstName'].setValue(this.editData.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.lastName);
      this.userForm.controls['password'].setValue(this.editData.password);
    }
  }

  registerUser(){
    if(!this.editData){
      if(this.userForm.valid){
         this.api.postUser(this.userForm.value)
          .subscribe({
             next:(res)=>{
               alert("Registered Successful")
               this.userForm.reset();
               this.dialogRef.close('save');
             },
             error:()=>{
               alert("Error While Registering")
             }
          })
      }
      }else{
         this.updateUser()
      }
  }
  updateUser(){
    this.api.putUser(this.userForm.value,this.editData.id)
     .subscribe({
       next:(res)=>{
          alert("User Updated Successfully");
          this.userForm.reset();
          this.dialogRef.close('update');
       },
        error:()=>{
           alert("Error while Updating");
        }
      })
  }
  
}



