class AddDeleteColumnForOrders < ActiveRecord::Migration[7.1]
  def change
    add_column :orders,:deleted,:boolean,default: false
  end
end
