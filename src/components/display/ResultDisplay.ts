export class ResultDisplay {

  title: string;
  result: string;
  resultContainer: HTMLElement;
  titleSpan: HTMLSpanElement;
  resultSpan: HTMLSpanElement;

  constructor(title: string, result: string = '--') {
    this.title = title;
    this.result = result;
    this.resultContainer = document.createElement('div');
    this.titleSpan = document.createElement('span');
    this.resultSpan = document.createElement('span');
  }

  initDisplay(): HTMLElement  {
   
    this.resultContainer.classList.add('result-container');
    
    this.titleSpan.classList.add('title');
    this.titleSpan.textContent = this.title;
    
    this.resultSpan.classList.add('result');
    this.resultSpan.textContent = this.result;
    
    this.resultContainer.appendChild(this.resultSpan);
    this.resultContainer.appendChild(this.titleSpan);

    return this.resultContainer;
  }


}
