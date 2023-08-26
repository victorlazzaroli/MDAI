import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="w-full h-full flex items-center justify-center">
        <a href="http://localhost:4200" target="_self">
            <img src="/assets/logo.png" width="24px" height="24px" />
        </a>
    </div>
  `,
  styles: [
  ]
})
export class LogoComponent {

}
