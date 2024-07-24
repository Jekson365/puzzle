class CreateIngredientAmounts < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredient_amounts do |t|
      t.decimal :more
      t.decimal :less
      t.references :product,null: false,foreign_key: true
      t.references :stock,null: false,foreign_key: true
      t.timestamps
    end
  end
end
