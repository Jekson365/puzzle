class AddUniqueIndexToProductStock < ActiveRecord::Migration[7.1]
  def change
    add_index :product_calculations, [:product_id, :stock_id], unique: true, name: 'index_product_stock_on_product_id_and_stock_id'

  end
end
