module Employees
  class Employee < ApplicationRecord
    belongs_to :status,class_name: 'Employees::Status'
    belongs_to :position,class_name: 'Employees::Position'
  end
end