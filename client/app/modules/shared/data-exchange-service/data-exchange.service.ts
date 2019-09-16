import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  // private subject: Subject<any> = new Subject<any>();

  // public send(type: string, event: string, payload: any): void {
  //   this.subject.next({ type, event, payload });
  // }

  // public receive(tp: string, evt: string): Observable<any> {
  //   return this.subject.asObservable().pipe(
  //     filter(({ type, event, payload }) => {
  //       return type === tp && event === evt;
  //     }),
  //     map(({ type, event, payload }) => {
  //       return payload;
  //     })
  //   );
  // }
  private data = new Subject<ExchangedData>();
  public exchangeData = this.data.asObservable();

  public sendData(data: ExchangedData) {
    this.data.next(data);
  }
}
interface ExchangedData {
  type: string;
  payload: any;
}
