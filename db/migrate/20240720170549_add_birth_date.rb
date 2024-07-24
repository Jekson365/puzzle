class AddBirthDate < ActiveRecord::Migration[7.1]
  def change
    add_column :employees,:birth_date,:date
  end
end
