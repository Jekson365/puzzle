class CreateOrderedProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :ordered_products do |t|
      t.references :order,null: false,foreign_key: true
      t.references :product,null: false,foreign_key: true
      t.decimal :amount
      t.timestamps
    end
  end
end
