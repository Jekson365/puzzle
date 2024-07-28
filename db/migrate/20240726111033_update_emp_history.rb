class UpdateEmpHistory < ActiveRecord::Migration[7.1]
  def change
    add_column :employees_histories,:phone_number,:bigint
    add_column :employees_histories,:salary,:decimal
    add_column :employees_histories,:private_number,:bigint
  end
end
