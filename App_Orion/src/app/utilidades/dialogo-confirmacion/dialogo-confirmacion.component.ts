import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h1 mat-dialog-title>¿Está seguro?</h1>
    <div mat-dialog-content>
      <p>¿Desea borrar este registro?</p>
    </div>
    <div mat-dialog-actions class="flex flex-row gap-2 p-2">
      <button mat-button class="form__button" (click)="onCancel()">Cancelar</button>
      <button mat-button class="form__button danger" (click)="onConfirm()">Borrar</button>
    </div>
  `
})
export class ConfirmationDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);  
  }
}