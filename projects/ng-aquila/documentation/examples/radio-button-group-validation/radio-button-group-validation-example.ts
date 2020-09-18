import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @title Radio button group validation Example
 */
 @Component({
  templateUrl: './radio-button-group-validation-example.html',
  styleUrls: ['./radio-button-group-validation-example.css']
 })
export class RadioButtonGroupValidationExampleComponent {
  testForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.formBuilder.group({
      radioTestReactive: [null, Validators.required]
    });
  }
}