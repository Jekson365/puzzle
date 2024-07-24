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

ActiveRecord::Schema[7.1].define(version: 2024_07_21_204814) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string "name", null: false
    t.string "surname", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status_id", default: 1
    t.integer "position_id", default: 1
    t.date "birth_date"
    t.index ["position_id"], name: "index_employees_on_position_id"
    t.index ["status_id"], name: "index_employees_on_status_id"
  end

  create_table "employees_histories", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.string "position"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "employee_id"
  end

  create_table "ingredient_amounts", force: :cascade do |t|
    t.decimal "more"
    t.decimal "less"
    t.bigint "product_id", null: false
    t.bigint "stock_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_ingredient_amounts_on_product_id"
    t.index ["stock_id"], name: "index_ingredient_amounts_on_stock_id"
  end

  create_table "measure_units", force: :cascade do |t|
    t.string "unit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "note"
    t.datetime "reminder_date"
    t.boolean "checked", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ordered_products", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_ordered_products_on_order_id"
    t.index ["product_id"], name: "index_ordered_products_on_product_id"
  end

  create_table "ordered_types", force: :cascade do |t|
    t.bigint "ordered_product_id"
    t.bigint "stock_id"
    t.boolean "more"
    t.boolean "less"
    t.index ["ordered_product_id"], name: "index_ordered_types_on_ordered_product_id"
    t.index ["stock_id"], name: "index_ordered_types_on_stock_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "current_order_id", null: false
    t.decimal "total_price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "ready", default: false
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
  end

  create_table "product_calculations", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "stock_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "stock_id"], name: "index_product_stock_on_product_id_and_stock_id", unique: true
    t.index ["product_id"], name: "index_product_calculations_on_product_id"
    t.index ["stock_id"], name: "index_product_calculations_on_stock_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "product_image"
    t.bigint "category_id"
    t.bigint "sell_type_id"
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["sell_type_id"], name: "index_products_on_sell_type_id"
  end

  create_table "sell_types", force: :cascade do |t|
    t.string "name"
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "price", null: false
    t.decimal "amount", null: false
    t.integer "measure_unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "employees", "positions"
  add_foreign_key "employees", "statuses"
  add_foreign_key "ingredient_amounts", "products"
  add_foreign_key "ingredient_amounts", "stocks"
  add_foreign_key "ordered_products", "orders"
  add_foreign_key "ordered_products", "products"
  add_foreign_key "ordered_types", "ordered_products"
  add_foreign_key "ordered_types", "stocks"
  add_foreign_key "product_calculations", "products"
  add_foreign_key "product_calculations", "stocks"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "sell_types"
end
