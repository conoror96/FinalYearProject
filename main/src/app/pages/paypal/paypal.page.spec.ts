import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { PaypalPage } from './paypal.page';

describe('PaypalPage', () => {
  let component: PaypalPage;
  let fixture: ComponentFixture<PaypalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaypalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
