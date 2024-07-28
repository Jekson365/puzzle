class UpdateEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees,:phone_number,:bigint
    add_column :employees,:salary,:decimal
    add_column :employees,:private_number,:bigint
  end
end
