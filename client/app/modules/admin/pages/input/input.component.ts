import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InputService } from './input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit  {
  public registerForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private _inputService: InputService) {
  }
  ngOnInit() {
    //form
    this.registerForm = this.formBuilder.group({
     title: ['', [Validators.required, Validators.minLength(3)]],
     body: ['', [Validators.required, Validators.minLength(10)]]
   });
  }

  save(form) {
    console.log('FORM INPUT', form.form.value);
    this._inputService.addContent(form.form.value);
  }

 }
