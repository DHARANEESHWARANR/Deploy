class Collection < ApplicationRecord
  belongs_to :user
  has_many :bookmarks , dependent: :destroy
  accepts_nested_attributes_for :bookmarks
end
