import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellerListPage } from './seller-list.page';

describe('SellerListPage', () => {
  let component: SellerListPage;
  let fixture: ComponentFixture<SellerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
