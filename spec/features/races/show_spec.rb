require 'rails_helper'

RSpec.describe "Race show page", type: :system do

  describe "visiting a race show page" do
    before do
      # Clear all records to start fresh.
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      # Create a sample race with status "completed" and today's date.
      @race = FactoryBot.create(:race, title: "Test Race Show", status: "completed", start_date: Date.today)

      # Create sample users.
      @user1 = FactoryBot.create(:user, name: "Alice")
      @user2 = FactoryBot.create(:user, name: "Bob")
      @user3 = FactoryBot.create(:user, name: "Charlie")

      # Create race participants for the race.
      FactoryBot.create(:race_participant, race: @race, user: @user1, lane: 1, position: 1)
      FactoryBot.create(:race_participant, race: @race, user: @user2, lane: 2, position: 2)
      FactoryBot.create(:race_participant, race: @race, user: @user3, lane: 3, position: 3)
    end

    it "navigates from index to show and displays all race details" do
      # Visit the home (index) page.
      visit root_path

      # Check that the index page shows the race title.
      expect(page).to have_text("Test Race Show")

      # Click the "View Details" link for the race.
      click_link "View Details"

      # On the race show page, verify that the race details are present.
      expect(page).to have_text("Race: Test Race Show")
      expect(page).to have_text("Status: completed")

      # Format the date according to your dateFormating helper.
      formatted_date = Date.today.strftime("%d/%m/%Y")
      expect(page).to have_text("#{formatted_date}")

      expect(page).to have_text("Alice")
      expect(page).to have_text("Bob")
      expect(page).to have_text("Charlie")

      expect(page).to have_button("Back to all races")
      expect(page).to have_button("Edit the race")
    end
  end
end
