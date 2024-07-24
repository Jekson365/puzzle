class AddReferencesToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_reference :employees,:status,foreign_key: true
    add_reference :employees,:position,foreign_key: true
  end
end
