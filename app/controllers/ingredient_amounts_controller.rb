class IngredientAmountsController < ApplicationController
  def create
    ingredient_amount = IngredientAmount.new(ingredient_amount_params)
    if ingredient_amount.save
      render json: ingredient_amount
    else
      render json: ingredient_amount.errors.full_messages
    end
  end
  def show
    ingredient_amount = IngredientAmount.where(product_id: params[:id])
    render json: IngredientAmountBlueprint.render(ingredient_amount,view: :current)
  end
  def destroy
    ingredient_amount = IngredientAmount.find(params[:id])
    if ingredient_amount.destroy
      render json: ingredient_amount
    else
      render json: ingredient_amount.errors.full_messages
    end
  end
  private
  def ingredient_amount_params
    params.permit(:product_id,:stock_id,:more,:less)
  end
end