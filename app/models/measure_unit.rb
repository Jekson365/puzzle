class MeasureUnit < ApplicationRecord
  has_one :stock
  validates :unit,uniqueness: true
end