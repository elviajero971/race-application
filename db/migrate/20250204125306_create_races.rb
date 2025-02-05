class CreateRaces < ActiveRecord::Migration[8.0]
  def change
    create_table :races do |t|
      t.string :status
      t.string :title
      t.date :start_date

      t.timestamps
    end
  end
end
