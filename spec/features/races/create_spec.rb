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

      fill_in "Race Date", with: Date.today.to_s
      fill_in "Race Title", with: "Test Race New"

      select "Alice", from: "participant-0-user"
      fill_in "participant-0-lane", with: "1"

      select "Bob", from: "participant-1-user"
      fill_in "participant-1-lane", with: "2"

      click_button "Create Race"

      expect(page).to have_current_path(root_path)
      expect(page).to have_text("Test Race New")

      expect(page).to have_css('.MuiAlert-root', text: "Race created successfully", wait: 10, visible: false)
    end
  end

  context "when there is a mistake on the form (missing lane)" do
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

      fill_in "Race Date", with: Date.today.to_s
      fill_in "Race Title", with: "Te"

      select "Alice", from: "participant-0-user"
      fill_in "participant-0-lane", with: "1"

      select "Bob", from: "participant-1-user"
      fill_in "participant-1-lane", with: "2"

      click_button "Create Race"

      expect(page).to have_text("Title is too short (minimum is 3 characters)")
      expect(page).to have_css('.MuiAlert-root', text: "An error occurred, race couldn't be created", wait: 10, visible: false)
    end
  end
end
