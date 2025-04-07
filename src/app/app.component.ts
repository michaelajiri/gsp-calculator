import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gspForm: FormGroup;
  gspResult: any;

  constructor(private fb: FormBuilder) {
    this.gspForm = this.fb.group({
      gainPercentage: [null],
      fold: [null]
    });
  }

  calculateGSP() {
    const gainPercentageValue = this.gspForm.value.gainPercentage;
    const foldValue = this.gspForm.value.fold;

    const isGainProvided = gainPercentageValue != null && gainPercentageValue > 0;
    const isFoldProvided = foldValue != null && foldValue > 0;

    if (isGainProvided === isFoldProvided) {
      alert('Provide only one: Gain Percentage or Fold (not both)');
      return;
    }

    let gainPercentage, savePercentage, fold;

    if (isGainProvided) {
      gainPercentage = Math.round(gainPercentageValue);
      savePercentage = (gainPercentage / (100 + gainPercentage)) * 100;
      savePercentage = Math.max(1, Math.round(savePercentage));
      fold = gainPercentage / savePercentage;
    } else {
      fold = foldValue;
      gainPercentage = Math.round((fold - 1) * 100);
      savePercentage = (gainPercentage / (100 + gainPercentage)) * 100;
      savePercentage = Math.max(1, Math.round(savePercentage));
    }

    fold = (fold % 1 >= 0.6) ? Math.ceil(fold * 10) / 10.0 : Math.round(fold * 20.0) / 20.0;
    const gspType = `${gainPercentage} for ${Math.round(savePercentage)}`;

    this.gspResult = {
      gainPercentage,
      savePercentage,
      fold,
      gspType
    };
  }
}
