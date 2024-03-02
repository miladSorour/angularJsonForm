import {Component} from '@angular/core';
import { AuthService, UserType } from '../../service/auth.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
})
export class PersonCardComponent {
  user: UserType;

  constructor(private authService: AuthService,
  ) {
    this.user = authService.currentUserValue

  }


}
