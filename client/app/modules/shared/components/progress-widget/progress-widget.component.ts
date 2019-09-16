import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import Chart from "chart.js";
import * as moment from 'moment';

@Component({
  selector: "app-progress-widget",
  templateUrl: "./progress-widget.component.html",
  styleUrls: ["./progress-widget.component.scss"],
})

export class ProgressWidgetComponent implements AfterViewInit {
  @Input() users;
  labels = [];
  chartLabels = [];
  chartLabels1 = [];
  chartLabels2 = [];

  personalScoreArr: any[];
  personalScoreArr1: any[];
  personalScoreArr2: any[];
  averageScoreArr: any[];
  lineChart: any;
  lineChart1: any;
  lineChart2: any;
  displayLabels = [];
  displayLabelsGlobal = [];
  avgScoreChartData = { score: 0, base: 0, goal: 0 };
  avgScoreChartData1 = { score: 0, base: 0, goal: 0 };
  avgScoreChartData2 = { score: 0, base: 0, goal: 0 };
  doughnutChart: any;
  doughnutChart1: any;
  doughnutChart2: any;
  trackerLength: number;
  showWidgetLoader = true;
  showNotTracked = false;

  public numarBarbati;
  public numarFemei;
  public varstaMedie;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    console.log('THE USERS DATA', this.users);
    this.setDatasets();
  }

  // getWidgetInfo() {
  //   const resp = {
  //     AvgScore: [],
  //     CompetencyScores: [
  //       {Id: 746, Name: "Active Management Fundamentals", Score: 3, Base: 1, Goal: 2},
  //       {Id: 747, Name: "Planning", Score: 2.6, Base: 1, Goal: 2},
  //       {Id: 748, Name: "Motivational Leadership", Score: 3.2, Base: 1, Goal: 2},
  //       {Id: 749, Name: "Performance Management", Score: 3, Base: 1, Goal: 2},
  //       {Id: 750, Name: "Team Working", Score: 3, Base: 1, Goal: 2},
  //       {Id: 751, Name: "Communication", Score: 2.8, Base: 1, Goal: 2},
  //       {Id: 752, Name: "Resilience", Score: 3.2, Base: 1, Goal: 2},
  //       {Id: 753, Name: "Strategic Thinking", Score: 3.6, Base: 1, Goal: 2}
  //     ],
  //     GlobalAvgScore: {Id: 0, Name: "GlobalAvg", Score: 30.05000019, Base: 1, Goal: 2},
  //     PersonalScore: [
  //       {W: 1, Score: 1},
  //       {W: 2, Score: 1.5},
  //       {W: 3, Score: 2},
  //       {W: 4, Score: 2.64102554},
  //       {W: 5, Score: 2.897436},
  //       {W: 6, Score: 2.17948723},
  //       {W: 7, Score: 2.17948723},
  //       {W: 8, Score: 2.66666675},
  //       {W: 9, Score: 2.64102554},
  //       {W: 10, Score: 2.64102554},
  //       {W: 11, Score: 2.897436},
  //       {W: 12, Score: 2.974359},
  //       {W: 13, Score: 3.05128217},
  //     ],
  //     Team: null,
  //     TrackerLength: 12,
  //     TrackerType: null
  //   };

  //   const resp1 = {
  //     AvgScore: [],
  //     CompetencyScores: [
  //       {Id: 746, Name: "Active Management Fundamentals", Score: 3, Base: 1, Goal: 2},
  //       {Id: 747, Name: "Planning", Score: 2.6, Base: 1, Goal: 2},
  //       {Id: 748, Name: "Motivational Leadership", Score: 3.2, Base: 1, Goal: 2},
  //       {Id: 749, Name: "Performance Management", Score: 3, Base: 1, Goal: 2},
  //       {Id: 750, Name: "Team Working", Score: 3, Base: 1, Goal: 2},
  //       {Id: 751, Name: "Communication", Score: 2.8, Base: 1, Goal: 2},
  //       {Id: 752, Name: "Resilience", Score: 3.2, Base: 1, Goal: 2},
  //       {Id: 753, Name: "Strategic Thinking", Score: 3.6, Base: 1, Goal: 2}
  //     ],
  //     GlobalAvgScore: {Id: 0, Name: "GlobalAvg", Score: 22.05000019, Base: 1, Goal: 2},
  //     PersonalScore: [
  //       {W: 1, Score: 1},
  //       {W: 2, Score: 1.5},
  //       {W: 3, Score: 2},
  //       {W: 4, Score: 2.64102554},
  //       {W: 5, Score: 2.897436},
  //       {W: 6, Score: 2.17948723},
  //       {W: 7, Score: 2.17948723},
  //       {W: 8, Score: 2.66666675},
  //       {W: 9, Score: 2.64102554},
  //       {W: 10, Score: 2.64102554},
  //       {W: 11, Score: 2.897436},
  //       {W: 12, Score: 2.974359},
  //       {W: 13, Score: 3.05128217},
  //     ],
  //     Team: null,
  //     TrackerLength: 12,
  //     TrackerType: null
  //   };

  //   const resp2 = {
  //     AvgScore: [],
  //     CompetencyScores: [
  //       {Id: 746, Name: "Active Management Fundamentals", Score: 3, Base: 1, Goal: 2},
  //       {Id: 747, Name: "Planning", Score: 2.6, Base: 1, Goal: 2},
  //       {Id: 748, Name: "Motivational Leadership", Score: 3.2, Base: 1, Goal: 2},
  //       {Id: 749, Name: "Performance Management", Score: 3, Base: 1, Goal: 2},
  //       {Id: 750, Name: "Team Working", Score: 3, Base: 1, Goal: 2},
  //       {Id: 751, Name: "Communication", Score: 2.8, Base: 1, Goal: 2},
  //       {Id: 752, Name: "Resilience", Score: 3.2, Base: 1, Goal: 2},
  //       {Id: 753, Name: "Strategic Thinking", Score: 3.6, Base: 1, Goal: 2}
  //     ],
  //     GlobalAvgScore: {Id: 0, Name: "GlobalAvg", Score: 25.05000019, Base: 1, Goal: 2},
  //     PersonalScore: [
  //       {W: 1, Score: 1},
  //       {W: 2, Score: 1.5},
  //       {W: 3, Score: 2},
  //       {W: 4, Score: 2.64102554},
  //       {W: 5, Score: 2.897436},
  //       {W: 6, Score: 2.17948723},
  //       {W: 7, Score: 2.17948723},
  //       {W: 8, Score: 2.66666675},
  //       {W: 9, Score: 2.64102554},
  //       {W: 10, Score: 2.64102554},
  //       {W: 11, Score: 2.897436},
  //       {W: 12, Score: 2.974359},
  //       {W: 13, Score: 3.05128217},
  //     ],
  //     Team: null,
  //     TrackerLength: 12,
  //     TrackerType: null
  //   };

  //   this.showResultsMe(resp, resp1, resp2);

  // }

  // showResultsMe(resp, resp1, resp2) {
  //   const obj = {
  //     PersonalWeeklyScore: resp.PersonalScore,
  //     AvgWeeklyScore: resp.AvgScore,
  //     AvgScore: resp.GlobalAvgScore.Score,
  //     Competency: { Goal: resp.GlobalAvgScore.Goal }
  //   };

  //   const obj1 = {
  //     PersonalWeeklyScore: resp1.PersonalScore,
  //     AvgWeeklyScore: resp1.AvgScore,
  //     AvgScore: resp1.GlobalAvgScore.Score,
  //     Competency: { Goal: resp1.GlobalAvgScore.Goal }
  //   };

  //   const obj2 = {
  //     PersonalWeeklyScore: resp2.PersonalScore,
  //     AvgWeeklyScore: resp2.AvgScore,
  //     AvgScore: resp2.GlobalAvgScore.Score,
  //     Competency: { Goal: resp2.GlobalAvgScore.Goal }
  //   };
  //   this.setDatasets(obj, obj1, obj2);
  // }

  setDatasets() {

    console.log('serverResp', this.users);

    // this.barbatiPeZile = [];
    // this.personalScoreArr1 = [];
    // this.personalScoreArr2 = [];
    // this.averageScoreArr = [];
    let days = [];
    let manOnDays = [];

    // line chart
    // {
    //   if (this.lineChart) {
    //     this.lineChart.destroy();
    //   }

    //   this.users.forEach(user => {
    //     user
    //   });

    //   this.chartLabels = ['24 Iunie', '25 Iunie', '26 Iunie', '27 Iunie'];

    //   serverResp["PersonalWeeklyScore"].forEach(
    //     function(item, index) {
    //       this.personalScoreArr.push(item.Score.toFixed(2));
    //       // this.chartLabels.push(item.W);
    //     }.bind(this)
    //   );

    //   this.personalScoreArr = this.personalScoreArr.slice(1).slice(-4);


    //   //
    //   serverResp1["PersonalWeeklyScore"].forEach(
    //     function(item, index) {
    //       this.personalScoreArr1.push(item.Score.toFixed(2));
    //       // this.chartLabels1.push(item.W);
    //     }.bind(this)
    //   );

    //   this.personalScoreArr1 = this.personalScoreArr1.slice(1).slice(-4);
    //   // this.chartLabels1 = this.chartLabels1.slice(1).slice(-4);
    //   // this.chartLabels1.forEach(
    //   //   function(item, index) {
    //   //     this.chartLabels[index] = "W" + item;
    //   //   }.bind(this)
    //   //);

    //    //
    //    serverResp2["PersonalWeeklyScore"].forEach(
    //     function(item, index) {
    //       this.personalScoreArr2.push(item.Score.toFixed(2));
    //       this.chartLabels2.push(item.W);
    //     }.bind(this)
    //   );

    //   this.personalScoreArr2 = this.personalScoreArr2.slice(1).slice(-4);
    //   // this.chartLabels2 = this.chartLabels2.slice(1).slice(-4);
    //   // this.chartLabels2.forEach(
    //   //   function(item, index) {
    //   //     this.chartLabels[index] = "W" + item;
    //   //   }.bind(this)
    //   // );

    //   // serverResp["AvgWeeklyScore"].forEach(
    //   //   function(item, index) {
    //   //     this.averageScoreArr.push(item.Score.toFixed(2));
    //   //   }.bind(this)
    //   // );
    //   console.log("this.personalScoreArr");
    //   console.log(this.personalScoreArr);
    //   console.log("this.chartLabels");
    //   console.log(this.chartLabels, this.chartLabels1, this.chartLabels2);

    //   this.lineChart = new Chart(document.getElementById("myChart"), {
    //     type: "line",
    //     data: {
    //       labels: this.chartLabels,
    //       datasets: [
    //         {
    //           // label: this.displayLabels["chartlegendMe"],
    //           data: this.personalScoreArr,
    //           borderColor:  "#d4379d",
    //           borderWidth: 2,
    //           pointBackgroundColor: "transparent",
    //           fill: false
    //         },
    //         // {
    //         //   label: this.displayLabels["chartLegendAverage"],
    //         //   data: this.averageScoreArr,
    //         //   borderColor: "#d8dae0",
    //         //   borderWidth: 2,
    //         //   fill: false,
    //         //   pointBackgroundColor: "#d8dae0"
    //         // },
    //         {
    //           label: this.displayLabels["chartLegendGoal"],
    //           data: Array(4).fill(2),
    //           borderColor: "#737c9d",
    //           borderWidth: 2,
    //           fill: false,
    //           radius: 0,
    //           borderDash: [10, 5],
    //           pointBorderWidth: 0,
    //           pointBackgroundColor: "transparent",
    //           pointBorderColor: "rgba(255, 255, 255, 0)"
    //         }
    //       ]
    //     },
    //     options: {
    //       layout: {
    //         padding: {
    //           // Any unspecified dimensions are assumed to be 0
    //           left: -5
    //         }
    //       },
    //       maintainAspectRatio: true,
    //       legend: {
    //         display: false
    //       },
    //       elements: {
    //         line: {
    //           tension: 0 // disables bezier curves
    //         }
    //       },
    //       scales: {
    //         yAxes: [
    //           {
    //             ticks: {
    //               beginAtZero: true
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   });

    //   //second linechart
    //   this.lineChart1 = new Chart(document.getElementById("myChart1"), {
    //     type: "line",
    //     data: {
    //       labels: this.chartLabels,
    //       datasets: [
    //         {
    //           // label: this.displayLabels["chartlegendMe"],
    //           data: this.personalScoreArr1,
    //           borderColor:  "#d4379d",
    //           borderWidth: 2,
    //           pointBackgroundColor: "transparent",
    //           fill: false
    //         },
    //         // {
    //         //   label: this.displayLabels["chartLegendAverage"],
    //         //   data: this.averageScoreArr,
    //         //   borderColor: "#d8dae0",
    //         //   borderWidth: 2,
    //         //   fill: false,
    //         //   pointBackgroundColor: "#d8dae0"
    //         // },
    //         {
    //           label: this.displayLabels["chartLegendGoal"],
    //           data: Array(4).fill(2),
    //           borderColor: "#737c9d",
    //           borderWidth: 2,
    //           fill: false,
    //           radius: 0,
    //           borderDash: [10, 5],
    //           pointBorderWidth: 0,
    //           pointBackgroundColor: "transparent",
    //           pointBorderColor: "rgba(255, 255, 255, 0)"
    //         }
    //       ]
    //     },
    //     options: {
    //       layout: {
    //         padding: {
    //           // Any unspecified dimensions are assumed to be 0
    //           left: -5
    //         }
    //       },
    //       maintainAspectRatio: true,
    //       legend: {
    //         display: false
    //       },
    //       elements: {
    //         line: {
    //           tension: 0 // disables bezier curves
    //         }
    //       },
    //       scales: {
    //         yAxes: [
    //           {
    //             ticks: {
    //               beginAtZero: true
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   });

    //    //thired linechart
    //    this.lineChart2 = new Chart(document.getElementById("myChart2"), {
    //     type: "line",
    //     data: {
    //       labels: this.chartLabels,
    //       datasets: [
    //         {
    //           // label: this.displayLabels["chartlegendMe"],
    //           data: this.personalScoreArr2,
    //           borderColor:  "#d4379d",
    //           borderWidth: 2,
    //           pointBackgroundColor: "transparent",
    //           fill: false
    //         },
    //         // {
    //         //   label: this.displayLabels["chartLegendAverage"],
    //         //   data: this.averageScoreArr,
    //         //   borderColor: "#d8dae0",
    //         //   borderWidth: 2,
    //         //   fill: false,
    //         //   pointBackgroundColor: "#d8dae0"
    //         // },
    //         {
    //           label: this.displayLabels["chartLegendGoal"],
    //           data: Array(4).fill(2),
    //           borderColor: "#737c9d",
    //           borderWidth: 2,
    //           fill: false,
    //           radius: 0,
    //           borderDash: [10, 5],
    //           pointBorderWidth: 0,
    //           pointBackgroundColor: "transparent",
    //           pointBorderColor: "rgba(255, 255, 255, 0)"
    //         }
    //       ]
    //     },
    //     options: {
    //       layout: {
    //         padding: {
    //           // Any unspecified dimensions are assumed to be 0
    //           left: -5
    //         }
    //       },
    //       maintainAspectRatio: true,
    //       legend: {
    //         display: false
    //       },
    //       elements: {
    //         line: {
    //           tension: 0 // disables bezier curves
    //         }
    //       },
    //       scales: {
    //         yAxes: [
    //           {
    //             ticks: {
    //               beginAtZero: true
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   });
    // }
    // doughnut chart
    {
    let totalMenArr = this.users.filter(user => {return user.sex === 'Masculin'});
    this.numarBarbati = totalMenArr.length;

    let totalWomenArr = this.users.filter(user => {return user.sex === 'Feminin'});
    this.numarFemei = totalWomenArr.length;

    let totalAgeArr = this.users.filter(user => {return user.age});
    let averageAge = 0;
    totalAgeArr.forEach(item => {
      averageAge = averageAge + Number(item.age);
    });
    this.varstaMedie = averageAge / totalAgeArr.length;
    console.log('VARSTA  ', averageAge, totalAgeArr);
      // this.avgScoreChartData = {
      //   total: totalMen.length,

      // };

      // this.avgScoreChartData1 = {
      //   score: serverResp1["AvgScore"],
      //   base: serverResp1["PersonalWeeklyScore"][0].Score,
      //   goal: serverResp1["Competency"].Goal
      // };
      // this.avgScoreChartData2 = {
      //   score: serverResp2["AvgScore"],
      //   base: serverResp2["PersonalWeeklyScore"][0].Score,
      //   goal: serverResp2["Competency"].Goal
      // };


      if (this.doughnutChart) {
        this.doughnutChart.destroy();
      }

      // fix overflow
      let data;
      if (this.avgScoreChartData.score > this.avgScoreChartData.goal) {
        data = [100, 0];
      } else {
        data = [
          ((this.avgScoreChartData.score - this.avgScoreChartData.base) * 100) /
            (this.avgScoreChartData.goal - this.avgScoreChartData.base),
          100 -
            ((this.avgScoreChartData.score - this.avgScoreChartData.base) *
              100) /
              (this.avgScoreChartData.goal - this.avgScoreChartData.base)
        ];
      }

      // let data1;
      // if (this.avgScoreChartData1.score > this.avgScoreChartData1.goal) {
      //   data1 = [100, 0];
      // } else {
      //   data1 = [
      //     ((this.avgScoreChartData1.score - this.avgScoreChartData1.base) * 100) /
      //       (this.avgScoreChartData1.goal - this.avgScoreChartData1.base),
      //     100 -
      //       ((this.avgScoreChartData1.score - this.avgScoreChartData1.base) *
      //         100) /
      //         (this.avgScoreChartData1.goal - this.avgScoreChartData1.base)
      //   ];
      // }

      // let data2;
      // if (this.avgScoreChartData2.score > this.avgScoreChartData2.goal) {
      //   data2 = [100, 0];
      // } else {
      //   data2 = [
      //     ((this.avgScoreChartData2.score - this.avgScoreChartData2.base) * 100) /
      //       (this.avgScoreChartData2.goal - this.avgScoreChartData2.base),
      //     100 -
      //       ((this.avgScoreChartData2.score - this.avgScoreChartData2.base) *
      //         100) /
      //         (this.avgScoreChartData2.goal - this.avgScoreChartData2.base)
      //   ];
      // }

      this.doughnutChart = new Chart(document.getElementById("doughnut"), {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [this.numarBarbati,0],
              backgroundColor: ["#d4379d"],
              borderWidth: 0
            }
          ]
        },
        options: {
          tooltips: { enabled: false },
          hover: { mode: null },
          cutoutPercentage: 80,
          responsive: true,
          legend: false,
          title: {
            display: false
          }
        }
      });

      //secpond doughnut
      this.doughnutChart1 = new Chart(document.getElementById("doughnut1"), {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [this.numarFemei, 0],
              backgroundColor: ["#d4379d"],
              borderWidth: 0
            }
          ]
        },
        options: {
          tooltips: { enabled: false },
          hover: { mode: null },
          cutoutPercentage: 80,
          responsive: true,
          legend: false,
          title: {
            display: false
          }
        }
      });

      //thired doughnut
      this.doughnutChart2 = new Chart(document.getElementById("doughnut2"), {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [this.varstaMedie, 0],
              backgroundColor: ["#d4379d"],
              borderWidth: 0
            }
          ]
        },
        options: {
          tooltips: { enabled: false },
          hover: { mode: null },
          cutoutPercentage: 80,
          responsive: true,
          legend: false,
          title: {
            display: false
          }
        }
      });
    }

    this.showWidgetLoader = false;
  }

  clickWidgetHeader() {
    this.router.navigate(["./"]);
  }
}
