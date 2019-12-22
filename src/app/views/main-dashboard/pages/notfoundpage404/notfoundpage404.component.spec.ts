import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Notfoundpage404Component } from './notfoundpage404.component';

describe('Notfoundpage404Component', () => {
  let component: Notfoundpage404Component;
  let fixture: ComponentFixture<Notfoundpage404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Notfoundpage404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Notfoundpage404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
