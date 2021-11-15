class AddTableShip < ActiveRecord::Migration[6.1]
  def change
    create_table :ships do |t|
      t.string :user_id
      t.json :location
      t.string :class
      t.json :modules
      t.timestamps
    end
  end
end
