import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanHelpComponent } from './can-help.component';

describe('CanHelpComponent', () => {
  let component: CanHelpComponent;
  let fixture: ComponentFixture<CanHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
