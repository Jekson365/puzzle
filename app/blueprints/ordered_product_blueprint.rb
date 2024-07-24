class OrderedProductBlueprint < Blueprinter::Base
  fields :order_id,:product_id,:amount
  association :product,blueprint: ProductBlueprint

  view :check do
    fields :amount
  end
end