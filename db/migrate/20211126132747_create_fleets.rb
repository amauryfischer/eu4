class CreateFleets < ActiveRecord::Migration[6.1]
  def change
    create_table :fleets do |t|
      t.string :user_id
      t.string :name
      t.string :shipIds, array: true
      t.json :position, default: {}
      t.timestamps
    end
  end
end
