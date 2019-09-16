import { element } from 'protractor';
import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as Survey from 'survey-angular';
import * as SurveyEditor from 'surveyjs-editor';

//Models
//import { GiveModel } from '../../../models/give.model';

@Component({
  selector: 'give-modal',
  templateUrl: './give.modal.html',
  styleUrls: ['./give.modal.css']
})

export class GiveModal implements OnInit {

  // @Output() onSave: EventEmitter<any> = new EventEmitter();
  //@Input() showModal: boolean;

  public giveForm: FormGroup;
  public surveyContainer: boolean;

  public surveyJSON = {
    pages: [
      {
        name:'page1', elements: [
          {
            type: "matrix",
            name: "sex",
            title: "sexul",
            columns: [
              { value: 1, text: "Femeie" },
              { value: 2, text: "Barbat" },
            ],
          },
          {
            type: "text",
            name: "age",
            title: "Varsta"
          },
          {
            type: "text",
            name: "lastName",
            title: "Nume"
          },
          {
            type: "text",
            name: "firstName",
            title: "Prenume"
          },
          {
            type: "text",
            name: "phone",
            title: "numarul dvs. de telefon"
          },
          {
            type: "text",
            name: "email",
            title: "adresa dvs. de email"
          },
          {
            type: "matrix",
            name: "agreement",
            title: "sunt de cu preluarea dateleor cu caracter personal",
            columns: [
              { value: 1, text: "Nu" },
              { value: 2, text: "Da" },
            ],
          },
        ]

      }
    ]
    // locale: "ro",
    // pages: [
    //   {
    //     name: "page1", elements: [
    //       {
    //         type: "matrix",
    //         name: "quality",
    //         title: "Va rugam exprimati-va acordul/ dezacordul cu urmatoarele",
    //         columns: [
    //           // { value: 1, text: "Strongly Disagree" },
    //           { value: 1, text: "Nu sunt" },
    //           { value: 2, text: "Indiferent" },
    //           { value: 3, text: "Sunt" },
    //           // { value: 5, text: "Strongly Agree" }
    //         ],
    //         rows: [
    //           { value: "affordable", text: "Produsul are pret accesibil" },
    //           { value: "doesWhatItClaims", text: "Produsul face ofera ce pretinde" },
    //           { value: "betterThenOthers", text: "Produsul este mai bun ca altele similare din piata" },
    //           { value: "easyToUse", text: "Produsul este usor de folosit" }
    //         ]
    //       },
    //       {
    //         type: "rating",
    //         name: "satisfaction",
    //         title: "Cat de satisfacut sunteti de produs?",
    //         minRateDescription: "Nesatisfacut",
    //         maxRateDescription: "Satisfacut"
    //       },
    //       {
    //         type: "rating",
    //         name: "recommend friends",
    //         visible: false,
    //         visibleIf: "{satisfaction} > 3",
    //         title: "Cat de probabil este ca sa recomandati produsul unui coleg de munca?",
    //         minRateDescription: "Nu recomand",
    //         maxRateDescription: "Da, recomand"
    //       },
    //       {
    //         type: "comment",
    //         name: "suggestions",
    //         title: "Ce v-ar face mai satisfacut de catre produs?"
    //       }
    //     ]
    //   },
    //   {
    //     name: "page2", elements: [
    //       {
    //         type: "radiogroup",
    //         name: "priceToCompetitors",
    //         title: "Raportat la competitorii nostri considerati ca produsul are pretul",
    //         choices: ["Mai Ieftin", "Similat", "Mai Scump", "Nu stiu"]
    //       },
    //       {
    //         type: "radiogroup",
    //         name: "price",
    //         title: "Considerati ca pretul curent este meritat?",
    //         choices: [
    //           { value: "correct", text: "Da, pretul este corect" },
    //           { value: "low", text: "Nu, pretul este prea mic" },
    //           { value: "high", text: "Nu, pretul este prea mare" }
    //         ]
    //       },
    //       {
    //         type: "multipletext",
    //         name: "priceLimit",
    //         title: "Care este... ",
    //         items: [
    //           {
    //             name: "leastAmount",
    //             title: "Cea mai mica suma rezonabila pentru dvs"
    //           },
    //           {
    //             name: "mostAmount",
    //             title: "Cea mai mare suma pe care o puteti plati pentru un pradus ca al nostru"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     name: "page3", elements: [
    //       {
    //         type: "text",
    //         name: "email",
    //         title: "Multumim pentru timpul daruit! Va rugam sa ne impartasiti adresa dvs de email"
    //       }
    //     ]
    //   }
    // ]
  };

  public surveyCustomCss = {
    root: "sv_main sv_default_css",
    header: "sv_header",
    body: "sv_body",
    footer: "sv_nav",
    matrix: {
      root: "table-custom"
    },
    navigationButton: "",
    navigation: {
      "complete": "btn sv_complete_btn",
      "prev": "btn sv_prev_btn",
      "next": "btn sv_next_btn",
      "start": "btn sv_start_btn"
    },
    question: {
      "mainRoot": "sv-question",
      "title": "sv-title",
      "description": "sv-description"
    },
    // progress: "progress center-block mx-auto mb-4",
    // progressBar: "progress-bar",
  };

  constructor(
    public _activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    Survey
      .StylesManager
      .applyTheme("bootstrap");

    let model = new Survey.Model(this.surveyJSON);
    //model.showProgressBar = 'bottom';
    Survey.SurveyNG.render('surveyElement', { model: model, css: this.surveyCustomCss });
    console.log('hit give.modal.ts');

    model.onComplete.add(res => {
      this._activeModal.close(res.data);
    })
  }

  public testFunc() {
    console.log('we get in test func');
  }

  private createForm() {
    this.giveForm = this._formBuilder.group({
      brand_name: ['', Validators.required],
      brand_description: ['', Validators.required],
      user_email: ['', Validators.required],
      user_phone: ['', Validators.required]
    });
  }

  // public submitGiveForm(value) {
  //   this._activeModal.close();
  //   console.log('you submitted value: ', value);
  //   this.onSave.emit({
  //     action: 'add',
  //     content: value
  //   });
  // }

}
