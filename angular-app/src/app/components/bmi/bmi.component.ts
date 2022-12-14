import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
})
export class BmiComponent implements OnInit {
  bmiForm!: FormGroup;
  bmi!: string;
  msg!: string;

  constructor() {}

  ngOnInit(): void {
    this.bmiForm = new FormGroup({
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    let h = form.get('height')?.value;
    let w = form.get('weight')?.value;
    this.msg = w;
    this.bmi = this.bmiCal(h, w);
    if (parseInt(this.bmi) < 18.5) {
      this.msg = 'Underweight';
    } else if (parseInt(this.bmi) > 18.5 && parseInt(this.bmi) < 25) {
      this.msg = 'Normal';
    } else {
      this.msg = 'Overweight';
    }
    form.reset();
  }

  bmiCal(h: number, w: number) {
    return (w / (h * h)).toFixed(2);
  }
}
