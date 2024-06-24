import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/_services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  expenseForm!: FormGroup;
  error = '';
  action = '';
  updatedExpenseId!: number;

  userObject = JSON.parse(localStorage['user']);
  accessToken = this.userObject.accessToken;

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {
    this.expenseForm = this.formBuilder.group({
      description: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      description: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.updatedExpenseId = Number(params['expenseId']);
      this.action = params['action'];

      if (this.updatedExpenseId !== undefined) {
        if (!isNaN(Number(this.updatedExpenseId))) {
          this.expenseService
            .getExpenseById(Number(this.updatedExpenseId), this.accessToken)
            .then((expenseData) => {
              this.expenseForm.patchValue(expenseData);
              this.expenseForm.controls['transactionDate'].setValue(
                new Date(expenseData.transactionDate)
              );
            })
            .catch((error: any) => {
              console.error('Error getting user by ID', error);
            });
        } else {
          console.error('Invalid user ID:', this.updatedExpenseId);
        }
      } else {
        console.error('User ID is not provided.');
      }
    });
  }

  onSubmit() {
    if (this.expenseForm.invalid) {
      this.error = 'Fill all fileds';
      return;
    }

    this.error = '';
    const formDataValue = this.expenseForm.value;
    const newContactRoleObject = {
      description: formDataValue.description,
      currency: formDataValue.currency,
      amount: formDataValue.amount,
      transactionDate: formDataValue.transactionDate,
    };

    if (this.action === 'update') {
      this.expenseService.updateExpensesById(
        this.accessToken,
        newContactRoleObject,
        this.updatedExpenseId
      );
    } else {
      this.expenseService.createNewExpense(
        this.accessToken,
        newContactRoleObject
      );
    }
  }
}
