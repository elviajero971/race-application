require 'rails_helper'

RSpec.describe "Races New page", type: :system do

  context "when creating a new race successfully" do
    before do
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")
    end

    it "creates the race and displays it on the index page" do
      visit root_path
      click_link "Create a new race"

      fill_in "start_date", with: Date.today.to_s
      fill_in "Race Title", with: "Test Race New"

      select "Alice", from: "race_participants_attributes.0.user_id"
      fill_in "race_participants_attributes.0.lane", with: "1"

      select "Bob", from: "race_participants_attributes.1.user_id"
      fill_in "race_participants_attributes.1.lane", with: "2"

      click_button "Submit race"

      expect(page).to have_current_path(root_path)
      expect(page).to have_text("Test Race New")

      expect(page).to have_css('.MuiAlert-root', text: "Race created successfully", wait: 10, visible: false)
    end
  end

  context "when there is a mistake on the form (title is too short)" do
    before do
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")
    end

    it "displays an error message about race title too short" do
      visit root_path
      click_link "Create a new race"

      fill_in "Start Date", with: Date.today.to_s
      fill_in "Race Title", with: "Te"

      select "Alice", from: "race_participants_attributes.0.user_id"
      fill_in "race_participants_attributes.0.lane", with: "1"

      select "Bob", from: "race_participants_attributes.1.user_id"
      fill_in "race_participants_attributes.1.lane", with: "2"

      click_button "Submit race"

      expect(page).to have_text("Title must be at least 3 characters")

      expect(page).to have_current_path('/races/new')

      expect(Race.all).to be_empty
    end
  end
end
