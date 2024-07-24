class AddReadyColumn < ActiveRecord::Migration[7.1]
  def change
    add_column :orders,:ready,:boolean,default: false
  end
end
