# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_04_125337) do
  create_table "race_participants", force: :cascade do |t|
    t.integer "race_id", null: false
    t.integer "user_id", null: false
    t.integer "position"
    t.integer "lane"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["race_id"], name: "index_race_participants_on_race_id"
    t.index ["user_id"], name: "index_race_participants_on_user_id"
  end

  create_table "races", force: :cascade do |t|
    t.string "status"
    t.string "title"
    t.date "start_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "race_participants", "races"
  add_foreign_key "race_participants", "users"
end
