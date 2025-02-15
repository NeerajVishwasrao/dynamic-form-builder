import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent {
  validatosArr: any = [];
  myForm: FormGroup;
  type: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ValidatorsComponent>) {
    this.type = data.type;
    this.myForm = new FormGroup({
      label: new FormControl('', []),
      maxLength: new FormControl(20, []),
      minLength: new FormControl(1, []),
      required: new FormControl(false, []),
      opt1: new FormControl('', []),
      opt2: new FormControl('', []),
      opt3: new FormControl('', []),
      opt4: new FormControl('', [])

    });
  }


  onSubmit() {


    if (this.myForm.value.required) {
      this.validatosArr.push(Validators.required);
    }
    if (this.myForm.value.minLength > 0) {
      this.validatosArr.push(Validators.minLength(this.myForm.value.minLength));
    }
    if (this.myForm.value.maxLength > 0) {
      this.validatosArr.push(Validators.maxLength(this.myForm.value.maxLength));
    }


    let output = {
      validators: this.validatosArr,
      label: this.myForm.value.label,
      options: {
        opt1: this.myForm.value.opt1,
        opt2: this.myForm.value.opt2,
        opt3: this.myForm.value.opt3,
        opt4: this.myForm.value.opt4
      }

    }
    this.ref.close(output);

  }

  close() {
    this.ref.close()
  }



}
