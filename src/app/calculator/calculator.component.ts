import { Component, OnInit } from '@angular/core';
import { findLeftoverRate } from './calculate';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  leftoverRate?;
  message?;
  params = {
    mAge: this.formatNum(23),
    fAge: 2.5,
    mOtd: 2,
    fOtd: 2,
    start: 10000000,
    pctFertile: 0.1,
    kidsTotal: 6, 
    fertilityWindow: 20
  }

  constructor() { }

  ngOnInit(): void {
  }

  _parseInt(s) {
    return parseInt(s);
  }

  calculate(_params) {
    this.leftoverRate = findLeftoverRate(_params)
  }

  inputParam(param: string, num: number) {
    if (param === "fAge"  && num > this.params.mAge ||
      param === "mAge" && num < this.params.fAge)
      this.message = "back off. women get married younger than men here."
    else {
      this.message = null;
      this.params[param] = this.formatNum(num);
      console.log('params: ', this.params)
    }
  }

  formatNum(n) {
    return parseInt((Math.round(n * 100) / 100).toFixed(2));
  }

  formatRate(_r) {
    const r = _r * 100;
    return this.formatNum(r);
  }
}
