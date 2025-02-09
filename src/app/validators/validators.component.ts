import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  validatosArr: any = []
  myForm: FormGroup;

  constructor(private ref: MatDialogRef<ValidatorsComponent>) {
    this.myForm = new FormGroup({
      label: new FormControl('', []),
      maxLength: new FormControl('', []),
      minLength: new FormControl('', []),
      required: new FormControl(true, [])

    });
  }

  onSubmit() {
    console.log(this.myForm.value.minLength);

    if (this.myForm.value.required) {
      this.validatosArr.push(Validators.required);
    }
    if (this.myForm.value.minLength > 0) {
      this.validatosArr.push(Validators.minLength(this.myForm.value.minLength));
    }
    if (this.myForm.value.maxLength > 0) {
      this.validatosArr.push(Validators.maxLength(this.myForm.value.minLength));
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
