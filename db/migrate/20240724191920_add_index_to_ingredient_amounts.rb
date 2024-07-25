class AddIndexToIngredientAmounts < ActiveRecord::Migration[7.1]
  def change
    add_index :ingredient_amounts,[:product_id,:stock_id],unique: true
  end
end
