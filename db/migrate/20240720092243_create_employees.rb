class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string :name,null: false
      t.string :surname,null: false
      t.timestamps
    end
  end
end
