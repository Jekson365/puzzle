module Employees
  class EmployeesHistoryController < ApplicationController
    def index
      histories = Employees::EmployeesHistory.all
      render json: histories
    end
  end
end