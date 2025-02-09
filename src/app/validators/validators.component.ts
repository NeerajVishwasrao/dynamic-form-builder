import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  validatosArr: any = []
  myForm: FormGroup;
type:string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private ref: MatDialogRef<ValidatorsComponent>) {
    this.type=data.type;
    this.myForm = new FormGroup({
      label: new FormControl('', []),
      maxLength: new FormControl('', []),
      minLength: new FormControl('', []),
      required: new FormControl(false, [])

    });
  }

  onSubmit() {
    console.log(this.myForm.value.minLength);
    console.log(this.myForm.value.maxLength);

console.log(this.myForm.value.required);

    if (this.myForm.value.required) {
      this.validatosArr.push(Validators.required);
    }
    if (this.myForm.value.minLength > 0) {
      this.validatosArr.push(Validators.minLength(this.myForm.value.minLength));
    }
    if (this.myForm.value.maxLength > 0) {
      this.validatosArr.push(Validators.maxLength(this.myForm.value.maxLength));
    }

    console.log(this.myForm.value);

    let output = {
      validators: this.validatosArr,
      label: this.myForm.value.label
    }
    this.ref.close(output);

  }

  close() {
    this.ref.close()
  }

  ngOnInit(): void {
  }

}
