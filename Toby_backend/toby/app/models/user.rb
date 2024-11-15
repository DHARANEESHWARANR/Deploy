class User < ApplicationRecord
    has_secure_password
    has_many :collections , dependent: :destroy
    validates :email, presence: true, uniqueness: true
    validates :first_name, :last_name, presence: true
  end
  