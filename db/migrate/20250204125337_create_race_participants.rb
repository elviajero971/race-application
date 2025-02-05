class CreateRaceParticipants < ActiveRecord::Migration[8.0]
  def change
    create_table :race_participants do |t|
      t.references :race, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :position
      t.integer :lane

      t.timestamps
    end
  end
end
