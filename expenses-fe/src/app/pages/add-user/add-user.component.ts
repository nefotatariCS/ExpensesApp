import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllUserRoleRepsonse, UserRole } from '../../_models/userRoles';

import { UserRoleService } from '../../_services/userRole.service';
import { UserService } from '../../_services/user.service';

interface Gender {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  userForm!: FormGroup;
  error = '';
  action = '';
  updatedUserId!: number;

  genderOptions!: Gender[] | any[];

  allUserRoleResponse!: AllUserRoleRepsonse;
  allUserRoles!: UserRole[] | any;

  userObject = JSON.parse(localStorage['user']);
  accessToken = this.userObject.accessToken;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userRoleService: UserRoleService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10,15}$/)],
      ],
      gender: ['', Validators.required],
      userRole: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.genderOptions = [
      { id: 1, name: 'Options', code: '-' },
      { id: 2, name: 'Male', code: 'M' },
      { id: 3, name: 'Female', code: 'F' },
      { id: 4, name: 'Other', code: 'O' },
    ];

    this.userRoleService.getAllUserRoles(this.accessToken).then((data) => {
      this.allUserRoleResponse = data;
      this.allUserRoles = this.allUserRoleResponse.userRoles;
    });

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10,15}$/)],
      ],
      gender: ['', Validators.required],
      userRole: ['', Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.updatedUserId = Number(params['userId']);
      this.action = params['action'];
      if (this.updatedUserId !== undefined) {
        if (!isNaN(Number(this.updatedUserId))) {
          this.userService
            .getUserById(Number(this.updatedUserId), this.accessToken)
            .then((userData) => {
              this.userForm.patchValue(userData);
              this.userForm.controls['userRole'].setValue(
                this.getObjectById(this.allUserRoles, userData.userRoleId)
              );
              this.userForm.controls['gender'].setValue(
                this.getObjectByCode(this.genderOptions, userData.gender)
              );
            })
            .catch((error) => {
              console.error('Error getting user by ID', error);
            });
        } else {
          console.error('Invalid user ID:', this.updatedUserId);
        }
      } else {
        console.error('User ID is not provided.');
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.error = 'Fill all fileds';
      return;
    }

    this.error = '';
    const formData = this.userForm.value;
    const newUser = {
      name: formData.name,
      lastName: formData.lastName,
      userName: formData.userName,
      password: formData.password,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender.code,
      userRoleId: formData.userRole.id,
    };
    if (this.action === 'update') {
      this.userService
        .updateUserById(this.accessToken, newUser, this.updatedUserId)
        .then((response) => {
          console.log('User updatet successfully:', response);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          this.error = error;
        });
    } else {
      this.userService
        .createNewUser(this.accessToken, newUser)
        .then((response) => {
          console.log('User created successfully:', response);
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          this.error = error;
        });
    }
  }

  getObjectById(array: any[], id?: number) {
    return array.find((item: { id: any }) => item.id === id);
  }

  getObjectByCode(array: any[], code?: string) {
    return array.find((item: { code: any }) => item.code === code);
  }
}
