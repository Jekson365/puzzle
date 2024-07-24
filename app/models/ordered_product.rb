class OrderedProduct < ApplicationRecord
  belongs_to :order
  belongs_to :product

  has_many :ordered_types
  accepts_nested_attributes_for :ordered_types

end