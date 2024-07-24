class CreateStocks < ActiveRecord::Migration[7.1]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.decimal :price,null: false
      t.decimal :amount,null: false
      t.integer :measure_unit_id
      t.timestamps
    end
  end
end
