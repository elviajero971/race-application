require 'rails_helper'

RSpec.describe "Home", type: :system do
  describe "visiting the home page" do
    it "displays the welcome message" do
      visit root_path

      expect(page).to have_text("Race Dashboard")
    end
  end
end
