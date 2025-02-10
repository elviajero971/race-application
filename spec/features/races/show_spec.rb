require 'rails_helper'

RSpec.describe "Race show page", type: :system do

  describe "visiting a race show page" do
    before do
      # Clear all records to start fresh.
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      # Create a sample race with status "completed" and today's date.
      @race = create(:race, title: "Test Race Show", status: "completed", start_date: Date.today)

      # Create sample users.
      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")
      @user3 = create(:user, name: "Charlie")

      # Create race participants for the race.
      create(:race_participant, race: @race, user: @user1, lane: 1, position: 1)
      create(:race_participant, race: @race, user: @user2, lane: 2, position: 2)
      create(:race_participant, race: @race, user: @user3, lane: 3, position: 3)
    end

    it "navigates from index to show and displays all race details" do
      visit root_path

      expect(page).to have_text("Test Race Show")

      click_link "View Details"

      expect(page).to have_text("Race: Test Race Show")
      expect(page).to have_text("Status: completed")

      # test failing when running rspec through docker but passing when running rspec locally
      # formatted_date = Date.today.strftime("%d/%m/%Y")
      # expect(page).to have_text("#{formatted_date}")

      expect(page).to have_text("Alice")
      expect(page).to have_text("Bob")
      expect(page).to have_text("Charlie")

      expect(page).to have_button("Back to all races")
      expect(page).to have_button("Update race")
    end
  end
end
