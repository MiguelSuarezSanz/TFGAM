import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterIndexComponent } from './character-index.component';

describe('CharacterIndexComponent', () => {
  let component: CharacterIndexComponent;
  let fixture: ComponentFixture<CharacterIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
