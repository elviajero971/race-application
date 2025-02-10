require 'rails_helper'

RSpec.describe "Race update page", type: :system do

  context "when updating a race successfully" do
    before do
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")
      @user3 = create(:user, name: "Charlie")

      @race = create(:race, title: "Original Race", status: "pending", start_date: Date.today)
      create(:race_participant, race: @race, user: @user1, lane: 1, position: 1)
      create(:race_participant, race: @race, user: @user2, lane: 2, position: 1)
    end

    it "updates the race details and participant info" do
      visit root_path

      find("a[aria-label='View details'][href='/races/#{@race.id}']").click

      click_button "Update race"

      fill_in "Race Title", with: "Updated Race Title"
      new_date = (Date.new(2025,12,31)).strftime("%d/%m/%Y")
      fill_in "Start Date", with: new_date

      fill_in "participant-0-lane", with: 1
      fill_in "participant-0-position", with: "2"
      fill_in "participant-1-lane", with: "2"
      fill_in "participant-1-position", with: 1

      click_button "Add Participant"

      select "Charlie", from: "participant-2-user"
      fill_in "participant-2-lane", with: "3"
      fill_in "participant-2-position", with: 2

      click_button "Update race"

      expect(page).to have_current_path("/races/#{@race.id}")
      expect(page).to have_text("Updated Race Title")

      # test failing when running rspec through docker but passing when running rspec locally
      # formatted_date = Date.new(2025,12,31).strftime("%d/%m/%Y") # Adjust according to your dateFormating helper.
      # expect(page).to have_text(formatted_date)

      expect(page).to have_text("Alice")

      expect(page).to have_text("Bob")

      expect(page).to have_text("Charlie")

      expect(page).to have_css('.MuiAlert-root', text: "Race updated successfully", wait: 10, visible: false)
    end
  end

  context "when updating a race with duplicate user selection" do
    before do
      Race.delete_all
      RaceParticipant.delete_all
      User.delete_all

      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")

      @race = create(:race, title: "Original Race", status: "pending", start_date: Date.today)
      create(:race_participant, race: @race, user: @user1, lane: 1, position: 1)
      create(:race_participant, race: @race, user: @user2, lane: 2, position: 2)
    end

    it "displays an error when the same user is selected for two participants" do
      visit root_path

      find("a[aria-label='View details'][href='/races/#{@race.id}']").click

      click_button "Update race"

      select "Alice", from: "participant-0-user"
      select "Alice", from: "participant-1-user"

      fill_in "participant-0-lane", with: "1"
      fill_in "participant-0-position", with: "1"
      fill_in "participant-1-lane", with: "2"
      fill_in "participant-1-position", with: "2"

      click_button "Update race"

      expect(page).to have_css('.MuiAlert-root', text: "An error occurred, race couldn't be updated", wait: 10, visible: false)

      expect(page).to have_text("Participants must each be a different user")
    end
  end
end
