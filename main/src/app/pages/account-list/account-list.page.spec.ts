import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountListPage } from './account-list.page';

describe('AccountListPage', () => {
  let component: AccountListPage;
  let fixture: ComponentFixture<AccountListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
