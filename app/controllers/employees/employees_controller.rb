module Employees
  class EmployeesController < ApplicationController
    before_action :authorize
    before_action :authorize_admin
    def index
      emp = Employees::Employee.all
      render json: Employees::EmployeeBlueprint.render(emp,view: :employee)
    end
    def create
      emp = Employees::Employee.new(employee_params)
      if emp.save
        render json: emp
        else
        render json: 'error'
      end
    end

    def update
      emp = Employees::Employee.find(update_params[:id])
      if emp
        if emp.update(update_params)
          Employees::EmployeesHistory.new(
            name:emp.name,
            employee_id:emp.id,
            surname: emp.surname,
            status: emp.status.name,
            position: emp.position.name,
            salary:emp.salary,
            phone_number:emp.phone_number,
            private_number:emp.private_number
          ).save
          render json: emp
        else
          render json: 'could not update'
        end
      else
        render json: 'could not find employee'
      end
    end

    private

    def employee_params
      params.permit(:name,:surname)
    end

    def update_params
      params.require(:employee).permit(:id,:name,:surname,:status_id,
                                       :position_id,:birth_date,:private_number,:phone_number,:salary)
    end
  end
end