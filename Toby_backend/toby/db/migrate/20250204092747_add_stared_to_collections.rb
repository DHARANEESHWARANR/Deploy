class AddStaredToCollections < ActiveRecord::Migration[8.0]
  def change
    add_column :collections, :stared, :boolean
  end
end
