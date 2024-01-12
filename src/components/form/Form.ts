import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isValid,
} from 'date-fns';
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

    this.form.appendChild(yearResult);
    this.form.appendChild(monthResult);
    this.form.appendChild(dayResult);
  }

  displayFormatError(input: HTMLElement) {
    input.classList.add('error');
  }

  checkInput(input: Input): boolean {
    const isValid = input.checkInput();
    if (!isValid) {
      this.displayFormatError(input.element);
    }
    return isValid; 
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

  calculateExactAge(day: number, month: number, year: number) {
    const birthDate = new Date(year, month - 1, day);
    
    if (
      !isValid(birthDate) ||
      birthDate.getDate() !== day ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getFullYear() !== year
      ) {
        throw new Error('Must be a valid date');
      }

    const now = new Date();

    if(now < birthDate) throw new Error("Must be in the past");
    

    const years = differenceInYears(now, birthDate);
    birthDate.setFullYear(birthDate.getFullYear() + years);

    const months = differenceInMonths(now, birthDate);
    birthDate.setMonth(birthDate.getMonth() + months);

    const days = differenceInDays(now, birthDate);

    return {
      years,
      months,
      days,
    };
  }

  handleFormSubmit() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const checkDay = this.isInputValid('day');
      const checkMonth = this.isInputValid('month');
      const checkYear = this.isInputValid('year');

      if (checkDay && checkMonth && checkYear) {
        try {
          const age = this.calculateExactAge(
            Number(this.dayInput.getInputValue()),
            Number(this.monthInput.getInputValue()),
            Number(this.yearInput.getInputValue())
          );

          this.dayResult.resultSpan.textContent = `${age.days}`;
          this.monthResult.resultSpan.textContent = `${age.months}`;
          this.yearResult.resultSpan.textContent = `${age.years}`;

          this.dayInput.clearInput(this.dayInput.inputElement);
          this.monthInput.clearInput(this.monthInput.inputElement);
          this.yearInput.clearInput(this.yearInput.inputElement);
        } catch (error) {
          this.dayInput.element.classList.add('error');
          this.monthInput.element.classList.add('error');
          this.yearInput.element.classList.add('error');
          this.dayInput.addErrorMessages((error as Error).message);
        }
      }
    });
  }
}
