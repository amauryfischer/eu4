class AddColumnPlanetResourcesMultiplicator < ActiveRecord::Migration[6.1]
  def change
    add_column :planets, :resourcesMultiplicator, :json
  end
end
