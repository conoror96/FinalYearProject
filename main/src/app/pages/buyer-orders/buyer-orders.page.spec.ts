import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyerOrdersPage } from './buyer-orders.page';

describe('BuyerOrdersPage', () => {
  let component: BuyerOrdersPage;
  let fixture: ComponentFixture<BuyerOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyerOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
