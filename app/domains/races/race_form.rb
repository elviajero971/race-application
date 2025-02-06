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

    # Run common validations in create and update
    validate :validate_create_conditions, on: :create
    validate :validate_update_conditions, on: :update

    def save
      return false unless valid?(:create)
      @race = Race.new(race_params)
      unless @race.save
        errors.add(:base, @race.errors.full_messages.to_sentence)
        return false
      end
      true
    end

    def update
      return false unless valid?(:update)
      if race.update(race_params)
        true
      else
        errors.add(:base, race.errors.full_messages.to_sentence)
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
      validates_number_of_participants
      validates_users_uniqueness
      validates_lanes_uniqueness
    end

    # -------------------------
    # Update validations
    # -------------------------
    def validate_update_conditions
      validate_create_conditions

      positions = race_participants_attributes.map { |h| h[:position] || h["position"] }
      array_of_errors = Races::RankingValidator.new(positions).call
      if array_of_errors.any?
        array_of_errors.each do |attribute, message|
          errors.add(attribute, message)
        end
      end

    end

    def validates_number_of_participants
      if race_participants_attributes.blank? || race_participants_attributes.size < 2
        errors.add(:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.at_least_two'))
      end
    end

    def validates_users_uniqueness
      user_ids = race_participants_attributes.map { |h| h[:user_id] || h["user_id"] }.map(&:to_i)

      if user_ids.any?(&:blank?)
        errors.add(
          :race_participants_attributes,
          I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.missing_user')
        )
      end

      # Check that each user_id corresponds to a valid User.
      invalid_ids = user_ids.reject(&:blank?).reject { |uid| User.exists?(id: uid) }
      if invalid_ids.any?
        errors.add(
          :race_participants_attributes,
          I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.invalid_user', user_ids: invalid_ids.join(", "))
        )
      end

      # Check for duplicate user_ids.
      duplicates = user_ids.group_by { |uid| uid }.select { |_, v| v.size > 1 }.keys
      if duplicates.any?
        errors.add(
          :race_participants_attributes,
          I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.duplicate_user', user_ids: duplicates.join(", "))
        )
      end
    end


    def validates_lanes_uniqueness
      lanes = race_participants_attributes.map { |h| h[:lane] || h["lane"] }
      if lanes.any?(&:blank?)
        errors.add(:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.missing_lane'))
      elsif lanes.uniq.size != lanes.size
        errors.add(:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.duplicate_lane'))
      end
    end
  end
end
