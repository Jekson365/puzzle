class OrderBlueprint < Blueprinter::Base
  fields :total_price,:current_order_id,:id,:ready
  association :ordered_products,blueprint: OrderedProductBlueprint
  view :check do
    fields :current_order_id,:total_price
  end
end