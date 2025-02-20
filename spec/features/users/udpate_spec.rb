require 'rails_helper'

RSpec.describe "Users Update", type: :system do
  describe "updating an existing user" do
    before do
      User.delete_all
      @user = create(:user, name: "Dave")
      visit root_path
      click_on "Go to users"
      find('button[aria-label="Update user"]').click
    end

    it "displays the edit form with prefilled data" do
      expect(page).to have_text("Update user")
      expect(find_field("Name").value).to eq("Dave")
    end

    it "updates the user successfully" do
      fill_in "Name", with: "David"
      click_button "Update user"

      expect(page).to have_text("David")

      expect(page).to have_css('.MuiAlert-root', text: "User updated successfully", wait: 10, visible: false)
    end

    it "displays an error message when the user name is too short" do
      fill_in "Name", with: "Da"
      click_button "Update user"

      expect(page).to have_text("Name must be at least 3 characters")
    end
  end
end
