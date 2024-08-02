class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category
    else
      render json: category.errors.full_messages
    end
  end

  def destroy
    category = Category.find(params[:id])
    begin
      category.destroy
      render json: category
    rescue ActiveRecord::InvalidForeignKey => e
      render json: { error: e.message }, status: 422
    end
  end


  private

  def category_params
    params.require(:category).permit(:name)
  end

end