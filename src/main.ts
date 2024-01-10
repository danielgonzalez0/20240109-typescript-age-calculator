import { AgeCalculatorForm } from './components/form/Form';
import './style.css';

export const FORM_CONTAINER: HTMLElement | null =
  document.getElementById('form-container');

export class AgeCalculator {

  formElement: AgeCalculatorForm;
  constructor() {
    this.formElement = new AgeCalculatorForm();
    // TODO
  }

   init() {
     this.formElement.initForm();
     FORM_CONTAINER?.appendChild(this.formElement.form);
  }
}

const ageCalculator = new AgeCalculator();
ageCalculator.init();
