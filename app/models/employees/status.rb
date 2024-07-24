module Employee
  class Status < ApplicationRecord
    belongs_to :employee, :class_name => 'Employee::Employee'
  end
end