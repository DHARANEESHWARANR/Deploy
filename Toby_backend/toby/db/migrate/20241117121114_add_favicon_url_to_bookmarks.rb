class AddFaviconUrlToBookmarks < ActiveRecord::Migration[8.0]
  def change
    add_column :bookmarks, :favicon_url, :string
  end
end
