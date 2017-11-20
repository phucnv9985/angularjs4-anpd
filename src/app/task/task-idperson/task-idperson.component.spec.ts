import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskIdpersonComponent } from './task-idperson.component';

describe('TaskIdpersonComponent', () => {
  let component: TaskIdpersonComponent;
  let fixture: ComponentFixture<TaskIdpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskIdpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskIdpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
