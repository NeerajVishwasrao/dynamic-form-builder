import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ValidatorsComponent } from '../validators/validators.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  type: string = '';


  ngOnInit(): void {
  }
  form: FormGroup;
  fields: FormArray;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.fields = this.fb.array([]);
    this.form = new FormGroup({ fields: this.fields });
  }

  addField(type: string) {
    this.type = type
      this.openDialogue(type)

    
  }
  openDialogue(type1:string) {
    let addModel = this.dialog.open(ValidatorsComponent, {
      width: '80%',
      height: '550px',
      data: {type:type1}
    });

    addModel.afterClosed().subscribe((input) => {
      if (input) {
        this.add(input.validators,input.label);
      }
    });
  }




  add(validatorsArr: any,label:string) {
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
    console.log(this.fields)
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      alert('Form submitted successfully!');
    }
  }
}
