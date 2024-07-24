class ProductCalculationBlueprint < Blueprinter::Base
  fields :stock_id,:product_id
  association :product,blueprint: ProductBlueprint
  association :stock,blueprint: StockBlueprint,view: :stock
end