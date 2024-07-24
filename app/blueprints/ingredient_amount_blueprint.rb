class IngredientAmountsBlueprint < Blueprinter::Base
  identifier :id
  fields :more,:less,:product_id,:stock_id

  association :stock,blueprint: StockBlueprint
end