class CreateEmployeesHistory < ActiveRecord::Migration[7.1]
  def change
    create_table :employees_histories do |t|
      t.string :name
      t.string :surname
      t.string :position
      t.string :status
      t.timestamps
    end
  end
end
