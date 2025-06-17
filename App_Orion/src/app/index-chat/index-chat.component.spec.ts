import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexChatComponent } from './index-chat.component';

describe('IndexChatComponent', () => {
  let component: IndexChatComponent;
  let fixture: ComponentFixture<IndexChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
