class User < ApplicationRecord
  has_many :race_participants, dependent: :destroy
  has_many :races, through: :race_participants
end
