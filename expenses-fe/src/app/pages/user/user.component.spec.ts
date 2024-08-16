import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../_services/user.service';
import { UserRoleService } from '../../_services/userRole.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TableModule } from 'primeng/table';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceMock: any;
  let userRoleServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getAllUsers']);
    userRoleServiceMock = jasmine.createSpyObj('UserRoleService', [
      'getAllUserRoles',
    ]);

    // Mock localStorage to return a valid user object
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ accessToken: 'mockAccessToken' });
      }
      return null;
    });

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientModule, RouterTestingModule, TableModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: UserRoleService, useValue: userRoleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
