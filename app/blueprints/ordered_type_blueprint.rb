class OrderedTypeBlueprint < Blueprinter::Base
  view :check do
    association :stock, blueprint: StockBlueprint, view: :name
    fields :more, :less
  end
end