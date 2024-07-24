class CreateOrderedTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :ordered_types do |t|
      t.references :ordered_product,foreign_key: true
      t.references :stock,foreign_key: true
      t.boolean :more
      t.boolean :less
    end

    # Ensure remove_column is reversible by specifying the type
    reversible do |dir|
      dir.up do
        remove_column :ordered_products, :more, :boolean
        remove_column :ordered_products, :less, :boolean
      end

      dir.down do
        add_column :ordered_products, :more, :boolean
        add_column :ordered_products, :less, :boolean
      end
    end
  end
end
