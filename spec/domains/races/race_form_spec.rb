# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Races::RaceForm, type: :model do
  before do
    @user1 = create(:user, name: 'Alice')
    @user2 = create(:user, name: 'Bob')
    @user3 = create(:user, name: 'Charlie')
  end

  describe 'Validations on create' do
    context 'when valid' do
      it 'is valid and saves successfully' do
        attributes = {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1 },
            { user_id: @user2.id, lane: 2 }
          ]
        }
        form = described_class.new(attributes)
        expect(form).to be_valid(:create)
        expect { form.save }.to change { Race.count }.by(1)
        expect(form.race).to be_present
      end
    end

    context 'when invalid' do
      it 'is invalid if there are less than 2 participants' do
        attributes = {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1 }
          ]
        }
        form = described_class.new(attributes)
        expect(form).not_to be_valid(:create)
        expect(form.errors[:race_participants_attributes]).to include("must be at least 2 per race")
      end

      it 'is invalid if a participant is missing a user_id' do
        attributes = {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: nil, lane: 1 },
            { user_id: @user2.id, lane: 2 }
          ]
        }
        form = described_class.new(attributes)
        expect(form).not_to be_valid(:create)
        expect(form.errors[:race_participants_attributes]).to include("must be a valid user")
      end

      it 'is invalid if duplicate user_ids exist' do
        attributes = {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1 },
            { user_id: @user1.id, lane: 2 }
          ]
        }
        form = described_class.new(attributes)
        expect(form).not_to be_valid(:create)
        expect(form.errors[:race_participants_attributes]).to include("must each be a different user")
      end

      it 'is invalid if a participant is missing a lane' do
        attributes = {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: nil },
            { user_id: @user2.id, lane: 2 }
          ]
        }
        form = described_class.new(attributes)
        expect(form).not_to be_valid(:create)
        expect(form.errors[:race_participants_attributes]).to include("must have a lane")
      end

      it 'is invalid if duplicate lanes exist' do
        attributes = {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1 },
            { user_id: @user2.id, lane: 1 }
          ]
        }
        form = described_class.new(attributes)
        expect(form).not_to be_valid(:create)
        expect(form.errors[:race_participants_attributes]).to include("must have a unique lane")
      end
    end
  end

  describe 'Validations on update' do
    let!(:race) { create(:race, status: 'in_progress', title: 'Initial Title', start_date: Date.today) }

    context 'when valid' do
      it 'is valid when have positions forming a contiguous range' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 2, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).to be_valid(:update)
      end

      it 'updates the race successfully' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 2, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form.update).to eq(true)
      end

      it 'is valid when multiple participants have the same position if within contiguous range' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 2, position: 1 },
            { user_id: @user3.id, lane: 3, position: 3 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).to be_valid(:update)
      end
    end

    context 'when invalid' do
      it 'is invalid when a participant is missing a position' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: nil },
            { user_id: @user2.id, lane: 2, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must have a position")
      end

      it 'is invalid when a participant has a position less than 1' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 0 },
            { user_id: @user2.id, lane: 2, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must have a valid ranking like 1, 2, 3, 4, 4, 5...")
      end

      it 'is invalid when positions do not form a contiguous range' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 2, position: 3 },
            { user_id: @user3.id, lane: 3, position: 4 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must have a valid ranking like 1, 2, 3, 4, 4, 5...")
      end

      it 'is invalid when multiple participants have the same position and violate contiguous range rule' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 2, position: 1 },
            { user_id: @user3.id, lane: 3, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
      end

      # Common validations on update.
      it 'is invalid when there are less than 2 participants' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must be at least 2 per race")
      end

      it 'is invalid when a participant is missing a user_id' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: nil, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 2, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must be a valid user")
      end

      it 'is invalid when duplicate user_ids exist' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user1.id, lane: 2, position: 2 },
            { user_id: @user3.id, lane: 3, position: 3 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must each be a different user")
      end

      it 'is invalid when user_id is not linked to a user' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: 24, lane: 2, position: 2 },
            { user_id: @user3.id, lane: 3, position: 3 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must be a valid user")
      end

      it 'is invalid when a participant is missing a lane' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: nil, position: 1 },
            { user_id: @user2.id, lane: 2, position: 2 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must have a lane")
      end

      it 'is invalid when duplicate lanes exist' do
        attributes = {
          status: 'completed',
          title: 'Updated Title',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1, position: 1 },
            { user_id: @user2.id, lane: 1, position: 2 },
            { user_id: @user3.id, lane: 3, position: 3 }
          ]
        }
        form = described_class.new(attributes.merge(race: race))
        expect(form).not_to be_valid(:update)
        expect(form.errors[:race_participants_attributes]).to include("must have a unique lane")
      end
    end
  end
end
