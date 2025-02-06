# spec/system/races_destroy_spec.rb
require 'rails_helper'

RSpec.describe "Race destroy", type: :system do
  before do
    Race.delete_all
    RaceParticipant.delete_all
    User.delete_all

    # Create sample user(s) and a race.
    @user = FactoryBot.create(:user, name: "Alice")
    @race = FactoryBot.create(:race, title: "Race to Delete", start_date: Date.today)
    FactoryBot.create(:race_participant, race: @race, user: @user, lane: 1)
  end

  it "destroys the race and displays a no races message on the index page" do
    visit root_path

    expect(page).to have_text("Race to Delete")

    click_button "Delete Race"

    page.driver.browser.switch_to.alert.accept

    expect(page).to have_text("No races yet")

    expect(Race.all).to be_empty
    expect(RaceParticipant.all).to be_empty
  end
end
