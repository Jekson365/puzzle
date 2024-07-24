class CreateMeasureUnits < ActiveRecord::Migration[7.1]
  def change
    create_table :measure_units do |t|
      t.string :unit
      t.timestamps
    end
  end
end
