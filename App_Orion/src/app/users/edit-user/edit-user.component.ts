import { Component, Input, OnInit } from '@angular/core';
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

  errors: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['id'];

      if (userId) {
        this.usersService.getUser(userId).subscribe({
          next: (response) => {
            if(response.body !== null){
              this.model = response.body;
            }else{
              this.router.navigate(['/users']);
            }
          },
          error: (error) => {
            console.error('Error loading user:', error);
          }
        });
      } else {
        this.router.navigate(['/users']);
      };
    });
  }


  saveChanges(user: UserCreateDTO){
    if (this.model !== null) {
      this.usersService.edit(this.model.Id, user).subscribe({
        next: () => {
          this.router.navigate([`/user/${this.model.Id}`]);
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
        }
      });
    }
  }
}
