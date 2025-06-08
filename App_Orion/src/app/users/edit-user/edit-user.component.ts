import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormUserComponent } from "../form-user/form-user.component";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UserCreateDTO, UserDTO } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  imports: [FormUserComponent,CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private usersService: UsersService, private activatedRoute: ActivatedRoute){

  }

  model!: UserDTO;

  errors: string[] = [];

  private subscriptions: Subscription[] = [];

  isAdmin: boolean = true;

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const userId = params['id'];

      if (!userId) {
        console.error('El ID del usuario no está definido.');
        this.router.navigate(['/users']);
        return;
      }

      const userSubscription = this.usersService.getUser(userId).subscribe({
        next: (response) => {
          if (!response.body) {
            console.error('Los datos del usuario no están disponibles.');
            this.router.navigate(['/users']);
            return;
          }
          this.model = response.body;
        },
        error: (error) => {
          console.error('Error al cargar el usuario:', error);
        }
      });

      this.subscriptions.push(userSubscription);
    });

    this.subscriptions.push(routeSubscription);
  }


  saveChanges(user: UserCreateDTO){
    if (this.model !== null) {
      const saveSubscription = this.usersService.edit(this.model.Id, user).subscribe({
        next: () => {
          this.router.navigate([`/user/${this.model.Id}`]);
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
        }
      });

      this.subscriptions.push(saveSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
