require 'rails_helper'

describe 'User' do
  # check all validations of model User
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
