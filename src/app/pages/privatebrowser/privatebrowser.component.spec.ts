import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatebrowserComponent } from './privatebrowser.component';

describe('PrivatebrowserComponent', () => {
  let component: PrivatebrowserComponent;
  let fixture: ComponentFixture<PrivatebrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatebrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatebrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
