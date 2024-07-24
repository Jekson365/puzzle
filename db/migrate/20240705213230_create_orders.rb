class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.integer :current_order_id,null: false
      t.decimal :total_price,null: false
      t.timestamps
    end
  end
end
