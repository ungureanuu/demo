import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { DashboardComponent } from './dashboard.component';
import { GiveModal } from '../../components/modals/give/give.modal';

//Modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Services
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const Components = [
  DashboardComponent,
  GiveModal
];

@NgModule({
  declarations: [
    ...Components
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        NgbModule.forRoot()
    ],
    providers: [
        NgbActiveModal
    ],
    entryComponents: [GiveModal]
})
export class DashboardModule { }

