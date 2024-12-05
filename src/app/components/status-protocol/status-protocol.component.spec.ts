import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusProtocolComponent } from './status-protocol.component';

describe('StatusProtocolComponent', () => {
  let component: StatusProtocolComponent;
  let fixture: ComponentFixture<StatusProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusProtocolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
