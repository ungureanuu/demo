import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../../../app-config';

@Injectable()
export class InputService {

  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient) { }


  addContent(content) {
    console.log('conent', content);
    this.http.post('http://bogdaprosteserver-test-env.5atwmvzbp9.eu-central-1.elasticbeanstalk.com' + '/addContent', content)
    .subscribe(res => console.log('Done', res));

  }
}
