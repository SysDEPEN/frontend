import { Component } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './card-protocol.html', 
  styleUrls: ['./card-protocol.css'],
})
export class StepProgressComponent {
  currentStep: number = 1;

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
