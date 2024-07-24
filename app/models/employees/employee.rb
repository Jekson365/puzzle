module Employee
  class Employee < ApplicationRecord
    has_many :statuses
    has_many :positions
  end
end