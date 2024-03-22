import { Component } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styles: `
    .spinner-container{
      align-items: center;
      background-color: black;
      border-radius: 30px;
      bottom: 15px;
      color: white;
      display: flex;
      padding: 5px 10px;
      position: fixed;
      right: 15px;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    span{
      margin-left: 5px;
    }
  `
})
export class LoadingSpinnerComponent {

}
