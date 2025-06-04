import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PublicacionCreateDTO } from '../publicacion';

@Component({
  selector: 'app-form-publicacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-publicacion.component.html',
  styleUrls: ['./form-publicacion.component.css']
})
export class FormPublicacionComponent implements OnInit, OnChanges {
  constructor(private formBuilder: FormBuilder) {}

  form!: FormGroup;

  @Input()
  model!: PublicacionCreateDTO;

  @Input()
  errors: string[] = [];

  @Output()
  OnSubmit: EventEmitter<PublicacionCreateDTO> = new EventEmitter<PublicacionCreateDTO>();

  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', { validators: [Validators.required] }],
      contenido: ['', { validators: [Validators.required] }],
      imagen: ['']
    });

    if (this.model) {
      this.form.patchValue(this.model);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model && this.form) {
      this.form.patchValue(this.model);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.OnSubmit.emit(this.form.value);
    }
  }

  onCancel() {
    this.OnCancel.emit();
  }
}
