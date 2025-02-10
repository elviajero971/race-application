require 'rails_helper'

RSpec.describe "Users Destroy", type: :system do
  describe "deleting a user" do
    before do
      User.delete_all
      @user = create(:user, name: "Eve")
      visit root_path
      click_on "List of users"
    end

    it "allows deleting a user and updates the list" do
      expect(page).to have_text("Eve")

      accept_confirm do
        find('button[aria-label="Delete user"]').click
      end

      expect(page).to have_text("User deleted successfully")
      expect(page).not_to have_text("Eve")
    end
  end
end
