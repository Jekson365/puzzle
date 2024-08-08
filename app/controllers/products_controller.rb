class ProductsController < ApplicationController
  before_action :authorize
  before_action :authorize_admin,only: [:show]
  def create
    product = Product.new(product_params)
    if product.save
      render json: product
    else
      render json: product.errors.full_messages
    end
  end
  def destroy
    product = Product.find(params[:id])
    if product
      product.deleted = true
      product.save
    end
  end
  def index
    products = Product.where(deleted: false)
    render json: products
  end
  def show
    product = Product.find(params[:id])
    unless product.deleted
      render json: ProductBlueprint.render(product)
    end
  end
  def show_by_category
    products = Product.where(category_id: params[:cat_id])
    products_with_ingredients = products.select do |product|
      IngredientAmount.exists?(product_id: product.id)
    end
    render json: ProductBlueprint.render(products_with_ingredients)
  end
  def update
    product = Product.find(params[:id])
    if product.update(product_update_params)
      render json: product
    else
      render json: product.errors.full_messages
    end

  end

  private

  def product_params
    params.permit(:name, :price, :product_image,:category_id,:sell_type_id)
  end
  def product_update_params
    params.require(:product).permit(:name,:price)
  end
end
