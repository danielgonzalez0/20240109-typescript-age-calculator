import { ResultDisplay } from '../display/ResultDisplay';
import { DayInput, Input, MonthInput, YearInput } from './Input';

export class AgeCalculatorForm {
  form: HTMLFormElement;
  submitButton: HTMLButtonElement;
  dayInput: Input;
  monthInput: Input;
  yearInput: Input;
  dayResult: ResultDisplay;
  monthResult: ResultDisplay;
  yearResult: ResultDisplay;

  constructor() {
    this.form = document.createElement('form');
    this.submitButton = document.createElement('button');

    this.dayInput = new DayInput({
      type: 'text',
      id: 'day',
      name: 'day',
      placeholder: 'DD',
      label: 'Day',
    });

    this.monthInput = new MonthInput({
      type: 'text',
      id: 'month',
      name: 'month',
      placeholder: 'MM',
      label: 'Month',
    });
    this.yearInput = new YearInput({
      type: 'text',
      id: 'year',
      name: 'year',
      placeholder: 'YYYY',
      label: 'Year',
    });

    this.dayResult = new ResultDisplay('days');
    this.monthResult = new ResultDisplay('months');
    this.yearResult = new ResultDisplay('years');
  }

  initForm() {
    this.displayForm();
    this.dayResult.initDisplay();
    this.handleFormSubmit();
  }

  displayForm() {
    this.displayInputs();
    this.displayButton();
    this.displayResults();
  }

  displayButton() {
    const buttonContainer: HTMLElement = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const button = this.submitButton;
    button.id = 'submit';
    button.type = 'submit';

    const buttonImage: HTMLImageElement = document.createElement('img');
    buttonImage.src = './arrow-down.svg';
    buttonImage.alt = 'arrow-down';
    button.appendChild(buttonImage);
    buttonContainer.appendChild(button);
    this.form.appendChild(buttonContainer);
  }

  displayInputs() {
    const inputContainer: HTMLElement = document.createElement('div');
    inputContainer.classList.add('input-container');

    const dayInput = this.dayInput.init();
    const monthInput = this.monthInput.init();
    const yearInput = this.yearInput.init();

    dayInput.classList.add('input');
    monthInput.classList.add('input');
    yearInput.classList.add('input');

    inputContainer.appendChild(dayInput);
    inputContainer.appendChild(monthInput);
    inputContainer.appendChild(yearInput);

    this.form.appendChild(inputContainer);
  }

  displayResults() {
    const dayResult = this.dayResult.initDisplay();
    const monthResult = this.monthResult.initDisplay();
    const yearResult = this.yearResult.initDisplay();

    this.form.appendChild(dayResult);
    this.form.appendChild(monthResult);
    this.form.appendChild(yearResult);
  }

  displayFormatError(input: HTMLElement) {
    input.classList.add('error');
  }

  checkInput(input: Input): boolean {
    const isValid = input.checkInput();
    if (!isValid) {
      this.displayFormatError(input.element);
    }
    return isValid; // Add
  }

  isInputValid(inputName: string): boolean {
    switch (inputName) {
      case 'day':
        return this.checkInput(this.dayInput);
      case 'month':
        return this.checkInput(this.monthInput);
      case 'year':
        return this.checkInput(this.yearInput);
      default:
        return true;
    }
  }

  handleFormSubmit() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const checkDay = this.isInputValid('day');
      const checkMonth = this.isInputValid('month');
      const checkYear = this.isInputValid('year');

      if (checkDay && checkMonth && checkYear) {
        console.log('form submitted');
        this.dayInput.clearInput(this.dayInput.inputElement);
        this.monthInput.clearInput(this.monthInput.inputElement);
        this.yearInput.clearInput(this.yearInput.inputElement);
      }
    });
  }
}
