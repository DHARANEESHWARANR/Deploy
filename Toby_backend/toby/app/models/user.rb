class User < ApplicationRecord
    has_secure_password
    has_many :collections , dependent: :destroy
    validates :email, presence: true, uniqueness: true, format: { 
      with: /\A[^@\s]+@[^@\s]+\.[^@\s]+\z/, 
      message: "must be a valid email address" 
    }
    validates :first_name, :last_name, presence: true
  end
  