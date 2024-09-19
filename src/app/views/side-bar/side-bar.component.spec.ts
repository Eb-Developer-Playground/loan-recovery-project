import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './side-bar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SideBarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            params: of({}),
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
