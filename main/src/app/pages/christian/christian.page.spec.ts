import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChristianPage } from './christian.page';

describe('ChristianPage', () => {
  let component: ChristianPage;
  let fixture: ComponentFixture<ChristianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChristianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChristianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
