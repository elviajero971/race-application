# spec/system/races_destroy_spec.rb
require 'rails_helper'

RSpec.describe "Race destroy", type: :system do
  before do
    Race.delete_all
    RaceParticipant.delete_all
    User.delete_all

    # Create sample user(s) and a race.
    @user = create(:user, name: "Alice")
    @race = create(:race, title: "Race to Delete", start_date: Date.today)
    create(:race_participant, race: @race, user: @user, lane: 1)
  end

  it "destroys the race and displays a no races message on the index page" do
    visit root_path

    accept_confirm do
      find('button[aria-label="Delete race"]').click
    end

    expect(page).to have_text("No races yet")

    expect(Race.all).to be_empty
    expect(RaceParticipant.all).to be_empty
  end
end
