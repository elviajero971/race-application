require 'rails_helper'

describe 'User' do
  describe '#create' do
    it 'is valid with a name' do
      user = User.new(name: 'Alice')
      expect(user).to be_valid
    end

    it 'is invalid without a name' do
      user = User.new(name: nil)
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'is invalid with a name less than 3 characters' do
      user = User.new(name: 'Al')
      user.valid?
      expect(user.errors[:name]).to include('is too short (minimum is 3 characters)')
    end

    it 'is invalid with a duplicate name' do
      User.create(name: 'Alice')
      user = User.new(name: 'Alice')
      user.valid?
      expect(user.errors[:name]).to include('has already been taken')
    end
  end

  describe '#destroy' do
    it 'cannot destroy a user that is registered in a race' do
      @user1 = create(:user, name: 'Bob')
      @user2 = create(:user, name: 'Alice')
      @race = create(:race, title: "Race", start_date: 3.days.ago, status: "completed")
      create(:race_participant, user: @user1, race: @race, lane: 1, position: 1)
      create(:race_participant, user: @user2, race: @race, lane: 2, position: 2)

      expect(User.count).to eq(2)

      result = @user1.destroy

      puts result

      expect(result).to eq(false)

      expect(User.count).to eq(2)

      # check the error message
      expect(@user1.errors[:base]).to include('cannot be deleted because it is associated with some races')
    end
  end

end
