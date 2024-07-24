class ChangeColumnNameOrderedProducts < ActiveRecord::Migration[7.1]
  def change
    remove_column :ordered_products,:les
    add_column :ordered_products,:less,:boolean
  end
end
