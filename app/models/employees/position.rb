module Employees
  class Position < ApplicationRecord
    has_many :employees, :class_name => 'Employees::Employee'
  end
end