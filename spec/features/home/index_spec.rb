require 'rails_helper'

RSpec.describe "Home", type: :system do
  describe "visiting the home page" do
    it "displays the welcome message" do
      visit root_path # Visit the root path (home#index)

      expect(page).to have_text("Race dashboard") # Check for specific text
    end
  end
end
