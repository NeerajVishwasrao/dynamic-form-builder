import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ValidatorsComponent } from '../validators/validators.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  type: string = '';
  form: FormGroup;
  fields: FormArray;
  options = {
    opt1: '',
    opt2: '',
    opt3: '',
    opt4: ''
  }



  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.fields = this.fb.array([]);
    this.form = new FormGroup({ fields: this.fields });
  }

  addField(type: string) {
    this.type = type
    this.openDialogue(type)


  }
  openDialogue(type1: string) {
    let addModel = this.dialog.open(ValidatorsComponent, {
      width: '80%',
      height: '550px',
      data: { type: type1 }
    });

    addModel.afterClosed().subscribe((input) => {
      if (input) {
        this.options.opt1=input.options.opt1
        this.options.opt2=input.options.opt2
        this.options.opt3=input.options.opt3
        this.options.opt4=input.options.opt4

        this.add(input.validators, input.label, input.options);
      }
    });
  }




  add(validatorsArr: any, label: string, options: any) {
    this.fields.push(new FormGroup({
      label: new FormControl(label, []),
      type: new FormControl(this.type, []),

      value: new FormControl('', validatorsArr),
    }));
  }
  removeField(index: number) {
    this.fields.removeAt(index);
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      alert('Form submitted successfully!');
    }
  }
}
