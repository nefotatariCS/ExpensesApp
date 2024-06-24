import { Component } from '@angular/core';

import { UserService } from '../../_services/user.service';
import { UserRoleService } from '../../_services/userRole.service';
import { AllUsersResponse, User } from '../../_models/users';
import { AllUserRoleRepsonse, UserRole } from '../../_models/userRoles';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  allUserReponse!: AllUsersResponse;
  allUsers: User[] | undefined | any;

  allUserRoleResponse!: AllUserRoleRepsonse;
  allUserRoles!: UserRole[] | any;

  userObject = JSON.parse(localStorage['user']);
  accessToken = this.userObject.accessToken;

  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.userRoleService
      .getAllUserRoles(this.accessToken)
      .then((data) => {
        this.allUserRoleResponse = data;
        this.allUserRoles = this.allUserRoleResponse.userRoles;
      });

    this.userService.getAllUsers(this.accessToken).then((data) => {
      this.allUserReponse = data;
      this.allUsers = this.allUserReponse.users;
      for (let i = 0; i < this.allUsers.length; i++) {
        const userRoleName = this.getUserRoleName(
          this.allUserRoles,
          this.allUsers[i].userRoleId
        );
        this.allUsers[i].userRoleName = userRoleName;
      }
    });
  }

  getUserRoleName(allUserRoles: UserRole[], userRoleId: number) {
    for (let i = 0; i < allUserRoles.length; i++) {
      if (allUserRoles[i].id === userRoleId) {
        return allUserRoles[i].userRoleDescription;
      }
    }
    throw new Error(`User role with ID ${userRoleId} not found`);
  }
}
