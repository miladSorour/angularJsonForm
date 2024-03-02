import {Component} from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
})
export class TextAreaComponent {

  // local storage key is generated based on user's id
  noteKey = "dashboard_" 
  // + this.authenticate.currentUserValue!.id
  text: string;


  constructor(private authenticate: AuthService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.text = localStorage.getItem(this.noteKey);
  }

  save(e: Event) {

    this.text = (<HTMLInputElement>e.target).value
    localStorage.setItem(this.noteKey, this.text)
  }
}
