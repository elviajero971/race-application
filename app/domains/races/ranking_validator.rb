module Races
  class RankingValidator
    def initialize(rankings_array)
      @rankings_array = rankings_array
    end

    def call
      array = []
      unless validates_blank_rankings?(@rankings_array)
        return [[:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.blank_rankings')]]
      end

      unless validates_standard_competition_ranking?(@rankings_array)
        array = [[:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.valid_rankings')]]
      end
      array
    end

    private

    def validates_blank_rankings?(positions)
      !positions.empty? && !positions.any?(&:blank?)
    end

    def validates_standard_competition_ranking?(positions)
      # order by lowest to highest
      positions = positions.sort
      positions = positions.map { |p| p.to_i }
      expected = 1
      current_group_value = nil
      group_count = 0

      positions.each do |p|
        if current_group_value != p
          expected += group_count if current_group_value
          if p != expected
            return false
          end

          current_group_value = p
          group_count = 1
        else
          group_count += 1
        end
      end
      true
    end
  end
end
