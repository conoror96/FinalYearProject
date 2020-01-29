import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NfcPage } from './nfc.page';

describe('NfcPage', () => {
  let component: NfcPage;
  let fixture: ComponentFixture<NfcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NfcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
