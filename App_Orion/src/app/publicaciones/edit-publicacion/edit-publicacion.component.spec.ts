import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicacionComponent } from './edit-publicacion.component';

describe('EditPublicacionComponent', () => {
  let component: EditPublicacionComponent;
  let fixture: ComponentFixture<EditPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPublicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
