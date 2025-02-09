require 'rails_helper'

RSpec.describe Api::V1::RacesController, type: :controller do

  describe "GET #index" do
    before do
      @race1 = create(:race, status: "completed")
      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")
      create(:race_participant, user: @user1, race: @race1, lane: 1, position: 1)
      create(:race_participant, user: @user2, race: @race1, lane: 2, position: 2)
    end

    it "returns http success" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns JSON with races including nested race_participants" do
      get :index

      json = JSON.parse(response.body)
      # Validate that the top-level JSON is an Array.
      expect(json).to be_an(Array)

      # Take the first race from the response.
      race = json.first

      # Check that the race has the expected keys.
      expect(race).to include(
                        "id",
                        "status",
                        "created_at",
                        "updated_at",
                        "race_participants"
                      )

      # Validate the data of the race.
      expect(race["id"]).to eq(@race1.id)
      expect(race["status"]).to eq("completed") # or whatever status is expected

      # Validate that race_participants is an Array.
      expect(race["race_participants"]).to be_an(Array)

      # Check that each race participant has the proper structure.
      race["race_participants"].each do |participant|
        expect(participant).to include(
                                 "id",
                                 "race_id",
                                 "user_id",
                                 "position",
                                 "lane",
                                 "created_at",
                                 "updated_at"
                               )
      end

      # Optionally, you can validate specific participant values.
      first_participant = race["race_participants"].first
      expect(first_participant["id"]).to eq(1)
      expect(first_participant["user_id"]).to eq(1)
      expect(first_participant["position"]).to eq(1)
      expect(first_participant["lane"]).to eq(1)
    end

  end

  describe "GET #show" do
    let(:race) { create(:race, title: 'Melbourne Highschool Race') }
    let(:user1) { create(:user, name: 'Bob') }
    let(:user2) { create(:user, name: 'Alice') }

    before do
      create(:race_participant, race: race, user: user1, lane: 1, position: 1)
      create(:race_participant, race: race, user: user2, lane: 2, position: 2)
    end

    it "returns http success" do
      get :show, params: { id: race.id }
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct race with nested race participants" do
      get :show, params: { id: race.id }
      json = JSON.parse(response.body)
      expect(json["id"]).to eq(race.id)
      expect(json).to have_key("race_participants")
    end

    it "returns not found when race does not exist" do
      get :show, params: { id: 0 }
      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json["error"]).to eq("Race not found")
    end
  end

  describe "POST #create" do
    let(:user1) { create(:user, name: 'John Doe') }
    let(:user2) { create(:user, name: 'Jane Rogers') }

    context "with valid params" do
      let(:valid_attributes) do
        {
          status: "pending",
          title: "Melbourne Highschool Race",
          start_date: Date.today,
          race_participants_attributes: [
            { user_id: user1.id, lane: 1 },
            { user_id: user2.id, lane: 2 }
          ]
        }
      end

      it "creates a new race with the right params" do
        expect(Race.all.count).to eq(0)
        expect(RaceParticipant.all.count).to eq(0)

        post :create, params: { race: valid_attributes }

        expect(Race.all.count).to eq(1)

        expect(RaceParticipant.all.count).to eq(2)

        expect(response).to have_http_status(:created)
      end

      it "returns the created race as JSON" do
        post :create, params: { race: valid_attributes }
        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq("pending")
      end
    end

    context "with invalid params" do
      # Assuming a race must have a status (or any other required validation)
      let(:invalid_attributes) { { status: nil } }

      it "returns unprocessable entity" do
        post :create, params: { race: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json).to have_key("errors")
      end

      it 'does not create a new race' do
        expect {
          post :create, params: { race: invalid_attributes }
        }.not_to change(Race, :count)
      end
    end
  end

  describe "PUT #update" do
    let(:race) { create(:race, status: "pending", title: "Sydney Race", start_date: 3.days.ago) }
    let(:user1) { create(:user, name: 'Bob') }
    let(:user2) { create(:user, name: 'Alice') }

    before do
      @race_participant_1 = create(:race_participant, race: race, user: user1, lane: 1)
      @race_participant_2 = create(:race_participant, race: race, user: user2, lane: 2)
    end

    context "with valid params" do
      let(:new_attributes) do
        {
          status: "completed",
          title: "Sydney Race",
          start_date: 3.days.ago,
          race_participants_attributes: [
            { id: @race_participant_1.id, race_id: race.id, user_id: user1.id, lane: 1, position: 2 },
            { id: @race_participant_2.id, race_id: race.id, user_id: user2.id, lane: 2, position: 1 }
          ]
        }
      end

      it "updates the race and race_participants" do
        expect(race.status).to eq("pending")
        expect(@race_participant_1.position).to be_nil
        expect(@race_participant_2.position).to be_nil

        put :update, params: { id: race.id, race: new_attributes }
        @race_participant_1.reload
        @race_participant_2.reload
        expect(race.reload.status).to eq("completed")
        expect(@race_participant_1.position).to eq(2)
        expect(@race_participant_2.position).to eq(1)
      end

      it "returns the updated race as JSON" do
        put :update, params: { id: race.id, race: new_attributes }
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq("completed")
        expect(json["race_participants"].first["position"]).to eq(2)
        expect(json["race_participants"].last["position"]).to eq(1)

      end
    end

    context "with invalid params" do
      let(:invalid_attributes) { { status: 'jojo' } }

      it "returns unprocessable entity" do
        put :update, params: { id: race.id, race: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json).to have_key("errors")
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:race) { create(:race) }

    it "destroys the race" do
      expect {
        delete :destroy, params: { id: race.id }
      }.to change(Race, :count).by(-1)
    end

    it "returns no content" do
      delete :destroy, params: { id: race.id }
      expect(response).to have_http_status(:no_content)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq "Race deleted successfully"
    end
  end
end
