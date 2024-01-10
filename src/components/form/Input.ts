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
    this.errorElement.classList.add('hidden');
  }

  init(): HTMLElement {
    if (this.label) {
      const label: HTMLLabelElement = document.createElement('label');
      if (this.id) label.htmlFor = this.id;
      label.innerText = this.label.toUpperCase();
      this.element.appendChild(label);
    }

    const input: HTMLInputElement = document.createElement('input');
    this.clearInput(input);
    input.type = this.type;
    if (this.id) input.id = this.id;
    if (this.name) input.name = this.name;
    if (this.placeholder) input.placeholder = this.placeholder;

    //append input to div
    this.element.appendChild(input);
    this.element.appendChild(this.errorElement);

    return this.element;
  }

  clearInput(input: HTMLInputElement): void {
    input.addEventListener('focus', () => {
      input.value = '';
      this.errorElement.classList.add('hidden');
      this.errorElement.textContent = '';
    });
  }
}
