class Category < ApplicationRecord
  has_many :stocks
  has_many :products
end