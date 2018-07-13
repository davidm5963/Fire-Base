import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessageFeedComponent } from './direct-message-feed.component';

describe('DirectMessageFeedComponent', () => {
  let component: DirectMessageFeedComponent;
  let fixture: ComponentFixture<DirectMessageFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMessageFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMessageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
