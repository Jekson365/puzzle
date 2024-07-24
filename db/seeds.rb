# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


ProductCalculation.destroy_all
OrderedType.destroy_all
IngredientAmount.destroy_all
OrderedProduct.destroy_all
Order.destroy_all
Product.destroy_all
Stock.destroy_all

# Product.destroy_all
# Stock.destroy_all