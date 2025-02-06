# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Races::RankingValidator do
  describe '#call' do
    context 'when there are no positions' do
      it 'returns an error about missing position' do
        error_array = described_class.new([]).call
        expect(error_array).to include(
                                 [:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.blank_rankings')]
                               )
      end
    end

    context 'when there are positions' do
      context 'when there are no nil positions and positions are valid and in order' do
        it 'returns an empty error array' do
          validator = described_class.new([1, 2, 3])
          error_array = validator.call
          expect(error_array).to be_empty
        end
      end

      context 'when there are no nil positions and positions are valid and not in order' do
        it 'returns an empty error array' do
          validator = described_class.new([1, 4, 2, 3])
          error_array = validator.call
          expect(error_array).to be_empty
        end
      end


      context 'when there are nil positions' do
        it 'returns an error about missing position' do
          error_array = described_class.new([1, 2, nil]).call
          expect(error_array).to include(
                                   [:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.blank_rankings')]
                                 )
        end
      end

      context 'when positions are less than 1' do
        it 'returns an error about positions being too low' do
          validator = described_class.new([0, 2, 3])
          error_array = validator.call
          expect(error_array).to include(
                                   [:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.valid_rankings')]
                                 )
        end
      end

      context 'when positions do not form a contiguous range' do
        it 'returns an error about the contiguous range' do
          error_array = described_class.new([1, 3, 4]).call
          expect(error_array).to include(
                                   [:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.valid_rankings')]
                                 )
        end
      end

      context 'when positions includes ties with the right ranking after' do
        it 'returns an empty error array when ties are at the begining' do
          error_array = described_class.new([1, 1, 3, 4]).call
          expect(error_array).to be_empty
        end

        it 'returns an empty error array when ties are at the end' do
          error_array = described_class.new([1, 2, 3, 3]).call
          expect(error_array).to be_empty
        end

        it 'returns an empty error array when ties are in the middle' do
          error_array = described_class.new([1, 2, 2, 4]).call
          expect(error_array).to be_empty
        end
      end

      context 'when positions includes ties with the wrong ranking after' do
        it 'returns an error about the contiguous range' do
          error_array = described_class.new([1, 1, 2, 3]).call
          expect(error_array).to include(
                                   [:race_participants_attributes, I18n.t('activemodel.errors.models.races/race_form.custom.race_participants.valid_rankings')]
                                 )
        end
      end
    end
  end
end
