import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductlistPage } from './productlist.page';

describe('ProductlistPage', () => {
  let component: ProductlistPage;
  let fixture: ComponentFixture<ProductlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
