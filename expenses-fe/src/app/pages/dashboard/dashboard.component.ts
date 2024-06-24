import { Component } from '@angular/core';
import { AllExpnesesReponse, Expense } from 'src/app/_models/expense';
import { ExpenseService } from 'src/app/_services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  allExpensesResponse: AllExpnesesReponse | undefined;
  expenses: Expense[] | undefined | any;

  userObject = JSON.parse(localStorage['user']);
  accessToken = this.userObject.accessToken;

  first = 0;

  rows = 10;

  constructor(private expenseService: ExpenseService) {}

  async ngOnInit(): Promise<void> {
    await this.expenseService.getAllExpenses(this.accessToken).then((data) => {
      this.allExpensesResponse = data;
      this.expenses = this.allExpensesResponse.expenses;
    });
  }
}
