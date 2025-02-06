# spec/domain/races/race_form_spec.rb

require 'rails_helper'

RSpec.describe Races::RaceForm, type: :model do
  before do
    @user1 = create(:user)
    @user2 = create(:user)
    @user3 = create(:user)
  end

  describe 'Validations on create' do
    let(:valid_attributes) do
      {
        status: 'pending',
        title: 'Melbourne Highschool race',
        start_date: Date.today,
        race_participants_attributes: [
          { user_id: @user1.id, lane: 1 },
          { user_id: @user2.id, lane: 2 }
        ]
      }
    end

    context 'with valid attributes' do
      it 'is valid in the create context' do
        form = described_class.new(valid_attributes)
        expect(form).to be_valid(:create)
      end

      it 'saves successfully' do
        form = described_class.new(valid_attributes)
        expect { form.save }.to change { Race.count }.by(1)
        expect(form.race).to be_present
      end
    end

    context 'common validations' do
      let(:invalid_attributes) do
        {
          status: 'pending',
          title: 'Melbourne Highschool race',
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: @user1.id, lane: 1 }
          ]
        }
      end
      context 'when there are less than 2 participants' do
        it 'is not valid' do
          form = described_class.new(invalid_attributes)
          expect(form).not_to be_valid(:create)
          expect(form.errors[:race_participants_attributes]).to include("Race must have at least 2 participants")
        end
      end

      context 'when a participant is missing a user_id' do
        it 'is not valid' do
          attrs = valid_attributes.deep_dup
          attrs[:race_participants_attributes][0][:user_id] = nil
          form = described_class.new(attrs)
          expect(form).not_to be_valid(:create)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a user")
        end
      end

      context 'when duplicate user_ids exist' do
        it 'is not valid' do
          attrs = valid_attributes.deep_dup
          attrs[:race_participants_attributes][1][:user_id] = @user1.id
          form = described_class.new(attrs)
          expect(form).not_to be_valid(:create)
          expect(form.errors[:race_participants_attributes]).to include("Participants must be different users")
        end
      end

      context 'when a participant is missing a lane' do
        it 'is not valid' do
          attrs = valid_attributes.deep_dup
          attrs[:race_participants_attributes][0][:lane] = nil
          form = described_class.new(attrs)
          expect(form).not_to be_valid(:create)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a lane")
        end
      end

      context 'when duplicate lanes exist' do
        it 'is not valid' do
          attrs = valid_attributes.deep_dup
          attrs[:race_participants_attributes][1][:lane] = 1
          form = described_class.new(attrs)
          expect(form).not_to be_valid(:create)
          expect(form.errors[:race_participants_attributes]).to include("Each participant must have a unique lane")
        end
      end
    end
  end

  describe 'Validations on update' do
    # Create an existing race that we will update.
    let!(:race) { create(:race, status: 'in_progress', title: 'Initial Title', start_date: Date.today) }

    let(:valid_update_attributes) do
      {
        status: 'completed',
        title: 'Updated Title',
        start_date: Date.today,
        race_participants_attributes: [
          { user_id: @user1.id, lane: 1, position: 1 },
          { user_id: @user2.id, lane: 2, position: 2 }
        ]
      }
    end

    let(:valid_update_attributes_with_same_position) do
      {
        status: 'completed',
        title: 'Updated Title',
        start_date: Date.today,
        race_participants_attributes: [
          { user_id: @user1.id, lane: 1, position: 1 },
          { user_id: @user2.id, lane: 2, position: 1 },
          { user_id: @user3.id, lane: 3, position: 3 }
        ]
      }
    end

    let(:invalid_update_attributes_with_same_position) do
      {
        status: 'completed',
        title: 'Updated Title',
        start_date: Date.today,
        race_participants_attributes: [
          { user_id: @user1.id, lane: 1, position: 1 },
          { user_id: @user2.id, lane: 2, position: 1 },
          { user_id: @user3.id, lane: 3, position: 2 }
        ]
      }
    end

    let(:invalid_update_attributes_with_same_user) do
      {
        status: 'completed',
        title: 'Updated Title',
        start_date: Date.today,
        race_participants_attributes: [
          { user_id: @user1.id, lane: 1, position: 1 },
          { user_id: @user1.id, lane: 2, position: 2 },
          { user_id: @user3.id, lane: 3, position: 3 }
        ]
      }
    end

    context 'with valid update attributes' do
      it 'is valid when all participants have positions forming a contiguous range' do
        form = described_class.new(valid_update_attributes.merge(race: race))
        expect(form).to be_valid(:update)
      end

      it 'updates the race successfully' do
        form = described_class.new(valid_update_attributes.merge(race: race))
        expect(form.update).to eq(true)
      end

      it 'is valid when multiple participants have the same position if within contiguous range' do
        form = described_class.new(valid_update_attributes_with_same_position.merge(race: race))
        expect(form).to be_valid(:update)
      end
    end

    context 'update-specific validations' do
      context 'when a participant is missing a position' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes][0][:position] = nil
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a position")
        end
      end

      context 'when a participant has a position less than 1' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes][0][:position] = 0
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a valid ranking like 1, 2, 3, 4, 4, 5...")
        end
      end

      context 'when positions do not form a contiguous range' do
        it 'is not valid' do
          attrs = {
            status: 'completed',
            title: 'Updated Title',
            start_date: Date.today,
            race_participants_attributes: [
              { user_id: @user1.id, lane: 1, position: 1 },
              { user_id: @user2.id, lane: 2, position: 3 },
              { user_id: @user3.id, lane: 3, position: 4 }
            ]
          }
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a valid ranking like 1, 2, 3, 4, 4, 5...")
        end
      end

      context 'when multiple participants have the same position and violate contiguous range rule' do
        it 'is not valid' do
          form = described_class.new(invalid_update_attributes_with_same_position.merge(race: race))
          expect(form).not_to be_valid(:update)
        end
      end
    end

    context 'common validations on update' do
      context 'when there are less than 2 participants' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes] = [{ user_id: @user1.id, lane: 1, position: 1 }]
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("Race must have at least 2 participants")
        end
      end

      context 'when a participant is missing a user_id' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes][0][:user_id] = nil
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a user")
        end
      end

      context 'when duplicate user_ids exist' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes][1][:user_id] = @user1.id
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("Participants must be different users")
        end
      end

      context 'when a participant is missing a lane' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes][0][:lane] = nil
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("All participants must have a lane")
        end
      end

      context 'when duplicate lanes exist' do
        it 'is not valid' do
          attrs = valid_update_attributes.deep_dup
          attrs[:race_participants_attributes][1][:lane] = 1
          form = described_class.new(attrs.merge(race: race))
          expect(form).not_to be_valid(:update)
          expect(form.errors[:race_participants_attributes]).to include("Each participant must have a unique lane")
        end
      end
    end
  end
end
