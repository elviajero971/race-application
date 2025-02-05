class Race < ApplicationRecord
  has_many :race_participants, dependent: :destroy
  has_many :users, through: :race_participants

  accepts_nested_attributes_for :race_participants
end
