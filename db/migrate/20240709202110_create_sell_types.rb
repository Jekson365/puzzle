class CreateSellTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :sell_types do |t|
      t.string :name
    end
    add_reference :products,:sell_type,foreign_key: true
  end
end
