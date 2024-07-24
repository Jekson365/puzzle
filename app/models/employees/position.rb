module Employee
  class Position < ApplicationRecord
    belongs_to :employee, :class_name => 'Employee::Employee'
  end
end