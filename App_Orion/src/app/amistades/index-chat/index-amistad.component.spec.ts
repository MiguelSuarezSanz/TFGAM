import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAsmistadComponent } from './index-amistad.component';

describe('IndexChatComponent', () => {
  let component: IndexAsmistadComponent;
  let fixture: ComponentFixture<IndexAsmistadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAsmistadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexAsmistadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
