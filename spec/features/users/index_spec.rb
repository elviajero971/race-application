# spec/system/users_index_spec.rb

require 'rails_helper'

RSpec.describe "Users index page", type: :system do
  describe "visiting the users index page" do
    before do
      visit root_path
      click_on "Go to users"
    end

    it "displays the welcome message" do
      expect(page).to have_text("Race management dashboard")
    end

    context "when no users are present" do
      before do
        User.delete_all
        visit root_path
        click_on "Go to users"
      end

      it "displays the header with no users messages" do
        expect(page).to have_text("No users yet")
      end

      it "displays the link to create a new user with the correct route" do
        expect(page).to have_link("Create a new user", href: '/users/new')
      end
    end

    context "when users are present" do
      before do
        User.delete_all
        RaceParticipant.delete_all

        @user1 = create(:user, name: "Alice")
        @user2 = create(:user, name: "Bob")
        visit root_path
        click_on "Go to users"
      end

      it "displays the users' names" do
        expect(page).to have_text("Alice")
        expect(page).to have_text("Bob")
      end
    end
  end
end
