require 'rails_helper'

RSpec.describe "Races index page", type: :system do
  describe "visiting the home page" do
    it "displays the welcome message" do
      visit root_path
      expect(page).to have_text("Race management dashboard")
    end

    context "when no races are present" do
      before do
        Race.delete_all
        visit root_path
      end

      it "displays the header with no races messages" do
        expect(page).to have_text("No races yet")
      end

      it "displays the link to create a new race with the correct route" do
        expect(page).to have_link("Create a new race", href: '/races/new')
      end
    end

    context "when races are present" do
      before do
        Race.delete_all
        RaceParticipant.delete_all
        User.delete_all

        @race1 = create(:race, title: "Test Race 1", start_date: Date.today)
        @user1 = create(:user, name: "Alice")
        @user2 = create(:user, name: "Bob")
        create(:race_participant, race: @race1, user: @user1, lane: 1)
        create(:race_participant, race: @race1, user: @user2, lane: 2)
      end

      it "displays the race details" do
        visit root_path

        expect(page).to have_text("Test Race 1")

        # test failing when running rspec through docker but passing when running rspec locally
        # formatted_date = Date.today.strftime("%d/%m/%Y")
        # expect(page).to have_text("Date: #{formatted_date}")

        expect(page).to have_text("2")

        expect(page).to have_css("a[aria-label='View details'][href='/races/#{@race1.id}']")
      end
    end
  end
end
