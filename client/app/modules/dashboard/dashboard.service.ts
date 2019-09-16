import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../app-config';

@Injectable()
export class DashboardService {

  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient) { }

  addGive(survey) {
    const obj = {
      // brand_name: brandName,
      // brand_description: brandDescription,
      // user_email: userEmail,
      // user_phone: userPhone
    };
    // const test = {
    //   'name': 'ungureanu',
    //   'age': 70
    // };

    console.log(obj);
    this.http.post('http://bogdaprosteserver-test-env.5atwmvzbp9.eu-central-1.elasticbeanstalk.com' + '/add', survey)
      .subscribe(res => console.log('Done'));
  }

  getContent() {
    return this.http.get('http://bogdaprosteserver-test-env.5atwmvzbp9.eu-central-1.elasticbeanstalk.com' + '/getContent');
  }
}
