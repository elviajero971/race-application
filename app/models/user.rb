class User < ApplicationRecord
  has_many :race_participants, dependent: :restrict_with_error
  has_many :races, through: :race_participants

  validates :name, presence: true, uniqueness: true, length: { minimum: 3 }
end
