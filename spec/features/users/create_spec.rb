require 'rails_helper'

RSpec.describe "Users Create", type: :system do
  describe "creating a new user" do
    before do
      User.delete_all
      visit root_path
      click_on "List of users"
      click_on "Create a new user"
    end

    it "displays the new user form" do
      expect(page).to have_text("New User")
      expect(page).to have_field("Name")
    end

    it "creates a new user successfully" do
      fill_in "Name", with: "Charlie"
      click_button "Create user"

      expect(page).to have_text("Charlie")

      expect(page).to have_css('.MuiAlert-root', text: "User created successfully", wait: 10, visible: false)
    end

    it "displays an error message when the user name is too short" do
      fill_in "Name", with: "Ch"

      click_button "Create user"

      expect(page).to have_text("Name is too short (minimum is 3 characters)")
    end
  end
end
