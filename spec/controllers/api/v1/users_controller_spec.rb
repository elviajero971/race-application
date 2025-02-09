require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  describe "GET #index" do
    before do
      @user1 = create(:user, name: "Alice")
      @user2 = create(:user, name: "Bob")
    end

    it "returns http success" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns JSON with races including nested race_participants" do
      get :index

      json = JSON.parse(response.body)
      expect(json).to be_an(Array)

      expect(json.length).to eq(2)

      first_user = json.first
      second_user = json.second

      expect(first_user).to include(
                        "id",
                        "name",
                        "created_at",
                        "updated_at"
                      )

      expect(first_user["id"]).to eq(@user1.id)
      expect(first_user["name"]).to eq("Alice")

      expect(second_user["id"]).to eq(@user2.id)
      expect(second_user["name"]).to eq("Bob")
    end
  end

  describe "GET #show" do
    before do
      @user = create(:user, name: "Alice")
    end

    it "returns http success" do
      get :show, params: { id: @user.id }
      expect(response).to have_http_status(:ok)
    end

    it "returns JSON with the user" do
      get :show, params: { id: @user.id }

      json = JSON.parse(response.body)

      expect(json).to include(
                        "id",
                        "name",
                        "created_at",
                        "updated_at"
                      )

      expect(json["id"]).to eq(@user.id)
      expect(json["name"]).to eq("Alice")
    end
  end

  describe "POST #create" do
    it "creates a new user" do
      expect(User.count).to eq(0)

      post :create, params: { user: { name: "Alice" } }

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)

      expect(json).to include(
                        "id",
                        "name",
                        "created_at",
                        "updated_at"
                      )

      expect(json["name"]).to eq("Alice")

      user = User.last
      expect(json["id"]).to eq(user.id)

      expect(user.name).to eq("Alice")
    end

    it 'returns an error when user name is missing' do
      post :create, params: { user: { name: nil } }

      expect(response).to have_http_status(:unprocessable_entity)

      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Name can't be blank", "Name is too short (minimum is 3 characters)")
    end
  end

  describe "PUT #update" do
    before do
      @user = create(:user, name: "Alice")
    end

    it "updates the user" do
      put :update, params: { id: @user.id, user: { name: "Bob" } }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to include(
                        "id",
                        "name",
                        "created_at",
                        "updated_at"
                      )

      expect(json["name"]).to eq("Bob")

      user = User.last
      expect(json["id"]).to eq(user.id)

      expect(user.name).to eq("Bob")
    end

    it 'returns an error when user name is missing' do
      put :update, params: { id: @user.id, user: { name: nil } }

      expect(response).to have_http_status(:unprocessable_entity)

      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Name can't be blank", "Name is too short (minimum is 3 characters)")
    end
  end

  describe "DELETE #destroy" do
    before do
      @user = create(:user)
    end

    it "deletes the user" do
      expect(User.count).to eq(1)

      delete :destroy, params: { id: @user.id }

      expect(response).to have_http_status(:no_content)
      expect(User.count).to eq(0)
    end
  end
end

