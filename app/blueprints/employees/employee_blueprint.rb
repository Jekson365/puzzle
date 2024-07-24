module Employees
  class EmployeeBlueprint < Blueprinter::Base
    view :employee do
      fields :name,:surname,:id,:birth_date
      field :age do |emp|
        if emp.birth_date
          ((DateTime.now - emp.birth_date.to_datetime) / 365).to_i
        else
          nil
        end
      end
      association :status,blueprint: Employees::StatusBlueprint
      association :position,blueprint: Employees::PositionBlueprint
    end
  end
end