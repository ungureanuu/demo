import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

//Modals
import { GiveModal } from '../../components/modals/give/give.modal';

//Services
import { DashboardService } from './dashboard.service';
import { DataExchangeService } from '../../modules/shared/data-exchange-service/data-exchange.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public showModal: boolean = false;
  public embedVideoString: string = `https://www.youtube.com/embed/fZsfQ6m9izk`;
  public embedSanitized;
  public content1: {title: string, body: string} = null;
  public content2: {title: string, body: string} = null;
  public content3: {title: string, body: string} = null;

  constructor(private modalService: NgbModal,
    private _dashboardService: DashboardService,
    private _sanitizer: DomSanitizer,
    private _dataExchange: DataExchangeService) { }

  ngOnInit() {
    this.embedSanitized = this._sanitizer.bypassSecurityTrustResourceUrl(this.embedVideoString);
   this._dashboardService.getContent().subscribe(res => {
      console.log('ZA CONENT', res);
      let content = Object.keys(res).map(function (key) { return res[key]; });
      this.content1 = {
        title: content.reverse()[0].title,
        body: content[0].body,
      };
    });
    // this.content1 = {
    //   title: 'Parintii',
    //   body: `Ne doare sa vedem cum se chinuie micutul nostru.Desi sunt extrem de saraci, parintii reusesc totusi sa-i tina
    //   pe copii curati si sa-i trimita la scoala. Primesc, daca
    //   li se ofera, ajutorul unor oameni cu suflet mare, impresionati de soarta lor. Si vor sa gaseasca o sursa de venit
    //   pentru tatal familiei, ca sa poata macar sa racordeze locuinta la curent electric.

    //   Izabela si Gheorghe Rau sunt impreuna de 20 de ani, timp in care au adus pe lume 12 copii. Barbatul a lucrat 15
    //   ani in
    //   mina din Valea Jiului, dar cand aceasta s-a inchis s-au intors cu totii pe meleagurile natale, in comuna Plopana,
    //   din
    //   judetul Bacau.

    //   Pe o bucatica de pamant, care nici nu le apartine, au ridicat 2 camere din chirpici in care se inghesuie cu totii
    //   si
    //   isi duc cum pot zilele. Sunt prea departe de oras, asa ca n-au noroc de serviciu, dar nici n-au cerut niciodata
    //   nimanui
    //   nimic.

    //   Barbatului i se frange inima cand vede cum copiii lui se chinuie sa invete la lumanare.`
    // };

    this.content2 = {
      title: '',
      body: 'Este unul dintre cei mai sclipitori copii. Sper din inima ca acest tanar talent sa reuseasca!'
    };

    this.content3 = {
      title: '',
      body: '...pe parcursul zilei merge prin frig si neinsotit pe o distanta de 10km!'
    };

  }

  public donateTime() {
    this.showModal = true;
    const modalRef = this.modalService.open(GiveModal);
    // modalRef.componentInstance.name = 'World';
    // modalRef.componentInstance.id = 10;
    modalRef.result.then((result) => {
      this.showModal = false;
      result.date = new Date();
      console.log('should be the same', result);
      this._dashboardService.addGive(result);
      // this._dataExchange.sendData({
      //   type: 'newForm',
      //   payload: result
      // });
    }).catch((error) => {
      this.showModal = false;
      console.log('nodal ref err', error);
    });
  }

  public moreDetails() {

  }

  public onAddTimeModalSave(event) {
    console.log('this is the event data', event);
  }

  public addGive(event) {
    console.log('the event from dashboard', event);
  }
}
