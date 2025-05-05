import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormUserComponent } from "../form-user/form-user.component";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UserCreateDTO, UserDTO } from '../user';

@Component({
  selector: 'app-edit-user',
  imports: [FormUserComponent,CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  constructor(private router: Router, private usersService: UsersService, private activatedRoute: ActivatedRoute){

  }

  model!: UserDTO;
  errors: string[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['id'];
      debugger
      if (userId) {
        this.usersService.getUser(userId).subscribe({
          next: (user: UserDTO | undefined) => {
            if (user) {
              this.model = user;
            } else {
              //this.router.navigate(['/users']);
            }
          },
          //error: () => this.router.navigate(['/users'])
        });
      } else {
        // this.router.navigate(['/users']);
      }
    });
  }


  saveChanges(user: UserCreateDTO){
    this.usersService.edit(this.model.id, user)
      .subscribe(() => {
        this.router.navigate([`/user/${this.model.id}`])
      })
  }
}
