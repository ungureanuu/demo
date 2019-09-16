import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../../../app-config';

@Injectable()
export class AdminService {

  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient) { }

  getAll() {
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

    return this.http.get('http://bogdaprosteserver-test-env.5atwmvzbp9.eu-central-1.elasticbeanstalk.com' + '/get');
  }

  // getEventsType() {
  //   return this._http.get(this.config.apiEndpoint + "api/events/event-type");
  // }
}
