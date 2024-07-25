class Product < ApplicationRecord
  mount_uploader :product_image,ProductImageUploader

  has_many :product_calculations
  has_many :stocks,through: :product_calculations
  has_many :ingredient_amounts


  belongs_to :category
  belongs_to :sell_type

  accepts_nested_attributes_for :product_calculations

  def product_image_url
    product_image.url
  end

  private

  # def assign_product_id_to_ingredients
  #   ingredient_amounts.each do |ingredient|
  #     ingredient.update(product_id: self.id)
  #   end
  # end
end