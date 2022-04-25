class AddTableFleets < ActiveRecord::Migration[6.1]
  def change
    create_table :fleets, id: :uuid do |t|
      t.string :user_id
      t.json :data
      t.timestamps
    end
  end
end
