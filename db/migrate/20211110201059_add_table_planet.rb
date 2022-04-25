class AddTablePlanet < ActiveRecord::Migration[6.1]
  def change
    create_table :planets, id: :uuid do |t|
      t.json :data
      t.string :user_id
      t.timestamps
    end
  end
end
