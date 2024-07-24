class CreateProductsCalculations < ActiveRecord::Migration[7.1]
  def change
    create_table :product_calculations do |t|
      t.references :product,null: false,foreign_key: true
      t.references :stock,null: false,foreign_key: true
      t.timestamps
    end
  end
end
