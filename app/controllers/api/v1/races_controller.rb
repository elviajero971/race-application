module Api
  module V1
    class RacesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_race, only: [:show, :update, :destroy]

      # GET /api/v1/races
      def index
        @races = Race.all
        render json: @races.to_json(include: :race_participants), status: :ok
      end

      # GET /api/v1/races/:id
      def show
        render json: @race.to_json(include: :race_participants), status: :ok
      end

      # POST /api/v1/races
      def create
        race_form = Races::RaceForm.new(race_params)
        if race_form.save
          render json: race_form.race.to_json(include: :race_participants), status: :created
        else
          render json: { errors: race_form.errors.messages }, status: :unprocessable_entity
        end
      end

      # PUT/PATCH /api/v1/races/:id
      def update
        race_form = Races::RaceForm.new(race_params.merge(race: @race))
        if race_form.update
          render json: @race.to_json(include: :race_participants), status: :ok
        else
          render json: { errors: race_form.errors.messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/races/:id
      def destroy
        @race.destroy
        head :no_content
      end

      private

      def set_race
        @race = Race.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Race not found" }, status: :not_found
      end

      # Strong parameters allowing nested race participants
      def race_params
        params.require(:race).permit(
          :status,
          :title,
          :start_date,
          race_participants_attributes: [
            :id,
            :user_id,
            :lane,
            :position
          ]
        )
      end
    end
  end
end
