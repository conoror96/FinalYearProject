import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardReaderPage } from './card-reader.page';

describe('CardReaderPage', () => {
  let component: CardReaderPage;
  let fixture: ComponentFixture<CardReaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
