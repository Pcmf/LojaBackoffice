import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanhosComponent } from './tamanhos.component';

describe('TamanhosComponent', () => {
  let component: TamanhosComponent;
  let fixture: ComponentFixture<TamanhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamanhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
