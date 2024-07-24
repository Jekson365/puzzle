class ProductBlueprint < Blueprinter::Base
  fields :name, :price, :product_image, :id

  association :ingredient_amounts, blueprint: IngredientAmountBlueprint
  association :stocks, blueprint: StockBlueprint,view: :stock
  association :category,blueprint: CategoryBlueprint
  association :sell_type,blueprint: SellTypeBlueprint

  view :index do
    fields :name,:price,:product_image,:id
  end
  view :product_name do
    fields :name
  end
end