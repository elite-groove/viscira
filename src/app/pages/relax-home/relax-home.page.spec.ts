import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelaxHomePage } from './relax-home.page';

describe('RelaxHomePage', () => {
  let component: RelaxHomePage;
  let fixture: ComponentFixture<RelaxHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelaxHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelaxHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
