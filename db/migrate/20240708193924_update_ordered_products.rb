class UpdateOrderedProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :ordered_products,:more,:boolean
    add_column :ordered_products,:les,:boolean
  end
end
