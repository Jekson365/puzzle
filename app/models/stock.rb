class Stock < ApplicationRecord
  belongs_to :measure_unit

  # belongs_to :category
  has_many :product_calculations
  has_many :products,through: :product_calculations
  has_many :ordered_types

  validates :name,uniqueness: true
end