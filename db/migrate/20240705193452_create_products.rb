class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name,null: false
      t.decimal :price,null: false
      t.timestamps
    end
  end
end
