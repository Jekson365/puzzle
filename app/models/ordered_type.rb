class OrderedType < ApplicationRecord
  belongs_to :ordered_product
  belongs_to :stock
end