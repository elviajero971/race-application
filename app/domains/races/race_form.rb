module Races
  class RaceForm
    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :status, :string
    attribute :title, :string
    attribute :start_date, :date
    attribute :race_participants_attributes, default: []

    attr_accessor :race

    validates :status, presence: true, inclusion: { in: %w[pending completed] }
    validates :title, presence: true, length: { minimum: 3, maximum: 255 }
    validates :start_date, presence: true

    validate :validate_create_conditions, on: :create

    validate :validate_update_conditions, on: :update

    def save
      return false unless valid?(:create)

      @race = Race.new(race_params)
      unless @race.save
        errors.add(:base, @race.errors.messages.to_sentence)
        return false
      end
      true
    end

    def update
      return false unless valid?(:update)

      if race.update(race_params)
        true
      else
        errors.add(:base, race.errors.messages.to_sentence)
        false
      end
    end

    private

    def race_params
      {
        status: status,
        title: title,
        start_date: start_date,
        race_participants_attributes: race_participants_attributes
      }
    end

    # -------------------------
    # Create validations
    # -------------------------
    def validate_create_conditions
      # 1. Must have at least 2 participants.
      if race_participants_attributes.blank? || race_participants_attributes.size < 2
        errors.add(:race_participants_attributes, "must have at least 2 participants")
      end

      # 2. All participants must have a user_id, and all user_ids must be unique.
      user_ids = race_participants_attributes.map { |h| h[:user_id] || h["user_id"] }
      if user_ids.any?(&:blank?)
        errors.add(:race_participants_attributes, "All participants must have a user")
      elsif user_ids.uniq.size != user_ids.size
        errors.add(:race_participants_attributes, "Participants must be different users")
      end

      # 3. All participants must have a lane and each lane must be unique.
      lanes = race_participants_attributes.map { |h| h[:lane] || h["lane"] }
      if lanes.any?(&:blank?)
        errors.add(:race_participants_attributes, "All participants must have a lane")
      elsif lanes.uniq.size != lanes.size
        errors.add(:race_participants_attributes, "Each participant must have a unique lane")
      end
    end

    # -------------------------
    # Update validations
    # -------------------------
    def validate_update_conditions
      validate_create_conditions

      # In update, we assume the race already exists and we’re updating results.
      # 1. Every participant must have a position.
      positions = race_participants_attributes.map { |h| h[:position] || h["position"] }

      if positions.any? { |p| p.blank? }
        errors.add(:race_participants_attributes, "All participants must have a position")
        return
      end

      # 2. All positions must be numeric and at least 1.
      positions = positions.map(&:to_i)
      if positions.any? { |p| p < 1 }
        errors.add(:race_participants_attributes, "Positions must be at least 1")
      end

      # 3. Check the contiguous range rule:
      #    The minimum position must be 1 and the maximum must equal the total number of participants.
      min = positions.min
      max = positions.max
      count = positions.size
      unless min == 1 && max == count
        errors.add(:race_participants_attributes, "Positions must range from 1 to #{count}")
      end
    end
  end
end
