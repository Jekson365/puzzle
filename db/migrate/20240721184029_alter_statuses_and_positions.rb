class AlterStatusesAndPositions < ActiveRecord::Migration[7.1]
  def change
    change_column :employees,:position_id,:integer,default: 1
    change_column :employees,:status_id,:integer,default: 1
  end
end
