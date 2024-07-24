class Order < ApplicationRecord
  has_many :products
  before_create :set_current_order_id

  has_many :ordered_products
  accepts_nested_attributes_for :ordered_products

  private
  def set_current_order_id
    last_order = Order.last
    self.current_order_id = last_order.present? ? last_order.current_order_id + 1 : 100
  end
end