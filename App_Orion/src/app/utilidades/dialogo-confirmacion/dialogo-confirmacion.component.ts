import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h1 mat-dialog-title>¿Está seguro?</h1>
    <div mat-dialog-content>
      <p>¿Desea borrar este registro?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button color="warn" (click)="onConfirm()">Borrar</button>
    </div>
  `
})
export class ConfirmationDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);  
  }
}