class AddTableShip < ActiveRecord::Migration[6.1]
  def change
    create_table :ships, id: :uuid do |t|
      t.string :user_id
      t.json :data
      t.timestamps
    end
  end
end
