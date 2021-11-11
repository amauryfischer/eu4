class AddColumnPlanet < ActiveRecord::Migration[6.1]
  def change
    create_table :planets do |t|
      t.json :coordinates
      t.json :resources
      t.string :user_id
      t.json :buildings
      t.timestamps
    end
  end
end
