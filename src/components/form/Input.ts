interface InputParams {
  type: string;
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
}

export class Input {
  type: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  element: HTMLElement;
  errorElement: HTMLSpanElement;
  labelElement: HTMLLabelElement;
  inputElement: HTMLInputElement;
  errorMessage: string;

  constructor(params: InputParams) {
    this.type = params.type;
    this.id = params.id;
    this.name = params.name;
    this.placeholder = params.placeholder;
    this.label = params.label;
    this.element = document.createElement('div');
    this.errorMessage = '';
    this.errorElement = document.createElement('span');
    this.inputElement = document.createElement('input');
    this.labelElement = document.createElement('label');
    this.errorElement.classList.add('hidden');
  }

  init(): HTMLElement {
    if (this.label) {
      if (this.id) this.labelElement.htmlFor = this.id;
      this.labelElement.innerText = this.label.toUpperCase();
      this.element.appendChild(this.labelElement);
    }

    this.clearInput(this.inputElement);
    this.inputElement.type = this.type;
    if (this.id) this.inputElement.id = this.id;
    if (this.name) this.inputElement.name = this.name;
    if (this.placeholder) this.inputElement.placeholder = this.placeholder;

    //append this.inputElement to div
    this.element.appendChild(this.inputElement);
    this.element.appendChild(this.errorElement);

    //add eventListener
    this.inputElement.addEventListener('focus', () => {
      this.clearInput(this.inputElement);
    });
    return this.element;
  }

  clearInput(input: HTMLInputElement): void {
    input.value = '';
    this.element.classList.remove('error');
    this.errorElement.classList.add('hidden');
    this.errorElement.textContent = '';
  }

  addErrorMessages(message: string): void {
    this.errorMessage = message;
    this.errorElement.textContent = this.errorMessage;
    this.errorElement.classList.remove('hidden');
  }

  isInputFilled(): boolean {
    const value = this.getInputValue();
    if (value === null || value === '') {
      return false;
    }
    return true;
  }

  checkInput(): boolean {
    if (!this.isInputFilled()) {
      this.addErrorMessages('This field is required');
      return false;
    }

    return true;
  }

  getInputValue(): string | null {
    let input: HTMLInputElement | null = null;

    for (let i = 0; i < this.element.children.length; i++) {
      if (this.element.children[i].tagName === 'INPUT') {
        input = this.element.children[i] as HTMLInputElement;
        break;
      }
    }
    if (input === null) {
      return null;
    } else {
      return input.value;
    }
  }
}

export class DayInput extends Input {
  constructor(params: InputParams) {
    super(params);
  }

  checkInput(): boolean {
    console.log('checkInput() in DayInput');

    if (!this.isInputFilled()) {
      this.addErrorMessages('This field is required');
      return false;
    }
    const inputValue = Number(this.getInputValue());
    if (
      isNaN(inputValue) ||
      inputValue < 1 ||
      inputValue > 31 ||
      inputValue % 1 !== 0
    ) {
      this.addErrorMessages('Must be a valid day');
      return false;
    }
    return true;
  }
}

export class MonthInput extends Input {
  constructor(params: InputParams) {
    super(params);
  }

  checkInput(): boolean {
    console.log('checkInput() in MonthInput');
    if (!this.isInputFilled()) {
      this.addErrorMessages('This field is required');
      return false;
    }

    const inputValue = Number(this.getInputValue());
    if (
      isNaN(inputValue) ||
      inputValue < 1 ||
      inputValue > 12 ||
      inputValue % 1 !== 0
    ) {
      this.addErrorMessages('Must be a valid month');
      return false;
    }

    return true;
  }
}
export class YearInput extends Input {
  static START_YEAR = 1900;

  constructor(params: InputParams) {
    super(params);
  }

  checkInput(): boolean {
    console.log('checkInput() in YearInput');
    if (!this.isInputFilled()) {
      this.addErrorMessages('This field is required');
      return false;
    }

    const inputValue = Number(this.getInputValue());
    const currentYear = new Date().getFullYear();

    if(inputValue < YearInput.START_YEAR) {
            this.addErrorMessages(`Must be at least ${YearInput.START_YEAR}`);
            return false;
    }
    if (
      isNaN(inputValue) ||
      inputValue > currentYear ||
      inputValue % 1 !== 0
    ) {
      this.addErrorMessages('Must be in the past');
      return false;
    }
    return true;
  }
}
