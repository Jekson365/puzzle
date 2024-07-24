module Employees
  class Status < ApplicationRecord
    has_many :employees, :class_name => 'Employees::Employee'
  end
end