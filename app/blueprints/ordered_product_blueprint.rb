class OrderedProductBlueprint < Blueprinter::Base
  fields :order_id,:product_id,:amount
  association :product,blueprint: ProductBlueprint
  association :ordered_types,blueprint: OrderedTypeBlueprint,view: :check

  view :check do
    fields :amount
  end
end