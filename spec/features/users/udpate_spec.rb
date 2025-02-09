require 'rails_helper'

RSpec.describe "Users Update", type: :system do
  describe "updating an existing user" do
    before do
      User.delete_all
      @user = create(:user, name: "Dave")
      visit root_path
      click_on "List of users"
      click_on "Update user"
    end

    it "displays the edit form with prefilled data" do
      expect(page).to have_text("Update user")
      expect(find_field("Name").value).to eq("Dave")
    end

    it "updates the user successfully" do
      fill_in "Name", with: "David"
      click_button "Update user"

      expect(page).to have_text("David")
    end
  end
end
