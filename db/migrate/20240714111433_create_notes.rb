class CreateNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :notes do |t|
      t.string :note
      t.datetime :reminder_date
      t.boolean :checked,default: false
      t.timestamps
    end
  end
end
