class IngredientAmountBlueprint < Blueprinter::Base
  identifier :id
  fields :more,:less,:product_id,:stock_id

  association :stock,blueprint: StockBlueprint

  view :current do
    association :stock, blueprint: StockBlueprint, view: :name
    association :product,blueprint: ProductBlueprint,view: :product_name

    fields :product_id, :stock_id
  end
end