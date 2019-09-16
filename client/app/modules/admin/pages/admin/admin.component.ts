import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataExchangeService } from '../../../../modules/shared/data-exchange-service/data-exchange.service';
import { AdminService } from './admin.service';


export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sex: any;
  age: string;
  agreement: any;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  public stats: boolean;
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'sex', 'age', 'agreement'];
  public users: Array<UserModel> = null;
  public dataSource;

  constructor (private _adminService: AdminService) {

  }

  public ngOnInit() {
    this._adminService.getAll().subscribe(res => {
      console.log('all from get', res);
      this.users = Object.keys(res).map(function (key) { return res[key]; });
      this.users
        .map(item => {
          if (item.sex === 1) {
            return item.sex = 'Feminin';
          } else if (item.sex === 2){
            return item.sex = 'Masculin';
          }
        });
        this.users.map(item => {
          if (item.agreement === 1) {
            return item.agreement = 'Nu';
          } else if (item.agreement === 2) {
            return item.agreement = 'Da';
          }
        });

      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    });

    this.stats = true;


  }

  public changeView(view) {

    switch (view) {
      case 'add': {
        this.stats = false;
        console.log('in add switch');
      }
      break;
      case 'input': {
        this.stats = true;
        console.log('in input');
      }
      break;
      default: {
        console.log('za default case');
      }
    }
  }

}
