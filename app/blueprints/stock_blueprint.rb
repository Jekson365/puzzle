class StockBlueprint < Blueprinter::Base
  view :stock do
    fields :id, :name, :price, :amount, :created_at, :measure_unit

    association :measure_unit, blueprint: MeasureUnitBlueprint
  end
  # association :category,blueprint: CategoryBlueprint
  view :name do
    fields :name
  end
end