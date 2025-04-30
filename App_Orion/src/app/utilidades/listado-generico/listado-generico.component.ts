import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listado-generico',
  imports: [CommonModule],
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent implements OnInit {

  @Input()

  listado: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
