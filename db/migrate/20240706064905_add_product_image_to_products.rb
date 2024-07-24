class AddProductImageToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products,:product_image,:string
  end
end
