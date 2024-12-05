import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomedapaginaComponent } from './nomedapagina.component';

describe('NomedapaginaComponent', () => {
  let component: NomedapaginaComponent;
  let fixture: ComponentFixture<NomedapaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomedapaginaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomedapaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
