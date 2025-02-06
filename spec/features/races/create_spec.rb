require 'rails_helper'

RSpec.describe "Races New page", type: :system do

  context "when creating a new race successfully" do
    before do
      # Ensure a clean state.
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      # Create sample users for the dropdown.
      @user1 = FactoryBot.create(:user, name: "Alice")
      @user2 = FactoryBot.create(:user, name: "Bob")
    end

    it "creates the race and displays it on the index page" do
      visit root_path
      click_link "Create a new race"

      # Fill in Race Date and Title.
      fill_in "Race Date", with: Date.today.to_s
      fill_in "Race Title", with: "Test Race New"

      # Fill in participant 0.
      # Our RaceNew component uses IDs such as "participant-0-user" and "participant-0-lane"
      select "Alice", from: "participant-0-user"
      fill_in "participant-0-lane", with: "1"

      # Fill in participant 1.
      select "Bob", from: "participant-1-user"
      fill_in "participant-1-lane", with: "2"

      # Submit the form.
      click_button "Create Race"

      # Verify that after creation, we are redirected to the index page.
      expect(page).to have_current_path(root_path)
      # Check that the new race title appears on the index page.
      expect(page).to have_text("Test Race New")
    end
  end

  context "when there is a mistake on the form (missing lane)" do
    before do
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      @user1 = FactoryBot.create(:user, name: "Alice")
      @user2 = FactoryBot.create(:user, name: "Bob")
    end

    it "displays an error message about race title too short" do
      visit root_path
      click_link "Create a new race"

      fill_in "Race Date", with: Date.today.to_s
      fill_in "Race Title", with: "Te"

      # Fill in first participant correctly.
      select "Alice", from: "participant-0-user"
      fill_in "participant-0-lane", with: "1"

      # Second participant: select a user but leave lane empty.
      select "Bob", from: "participant-1-user"
      # Leave "participant-1-lane" blank.
      fill_in "participant-1-lane", with: "2"

      click_button "Create Race"

      expect(page).to have_text("Title is too short (minimum is 3 characters)")
    end
  end
end
