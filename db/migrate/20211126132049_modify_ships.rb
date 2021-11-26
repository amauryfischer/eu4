class ModifyShips < ActiveRecord::Migration[6.1]
  def change
    remove_column :ships, :location
    remove_column :ships, :modules
    add_column :ships, :modules, :json, default: [], array: true
    add_column :ships, :name, :string
  end
end
