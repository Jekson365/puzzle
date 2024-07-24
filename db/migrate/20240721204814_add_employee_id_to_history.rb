class AddEmployeeIdToHistory < ActiveRecord::Migration[7.1]
  def change
    add_column :employees_histories,:employee_id,:integer
  end
end
