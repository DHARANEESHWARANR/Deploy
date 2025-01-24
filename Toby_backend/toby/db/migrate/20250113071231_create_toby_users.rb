class CreateTobyUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :toby_users do |t|
      t.integer :user_id
      t.integer :admin_user_id
      t.string :user_name

      t.timestamps
    end
  end
end
