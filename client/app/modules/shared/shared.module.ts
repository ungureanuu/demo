import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressWidgetComponent } from './components/progress-widget/progress-widget.component';


const ExportedComponents = [
  ProgressSpinnerComponent,
  ProgressWidgetComponent
];

@NgModule({
  declarations: [
    ...ExportedComponents
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CustomMaterialModule
  ],
  exports: [
    ...ExportedComponents
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule {

  constructor() {console.log('WE ARE IN SHARED MODULES')};
 }
