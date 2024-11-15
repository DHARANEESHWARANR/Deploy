class CreateBookmarks < ActiveRecord::Migration[7.2]
  def change
    create_table :bookmarks do |t|
      t.string :url
      t.string :title
      t.text :description
      t.references :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
