import { Component } from '@angular/core';
import { FormUserComponent } from "../form-user/form-user.component";

@Component({
  selector: 'app-create-user',
  imports: [FormUserComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

}
