class ProductCalculationsController < ApplicationController
  before_action :authorize
  before_action :authorize_admin
  def create
    product_calculation_params.each do |e|
      product_calculation = ProductCalculation.new(stock_id: e[:stock_id],product_id: e[:product_id])
      ingredient_amount = IngredientAmount.new(
        stock_id: e[:stock_id],
        product_id: e[:product_id],
        more: e[:more],
        less: e[:less]
      )
      ingredient_amount.save
      product_calculation.save
    end
    render json: 'saved'
  end

  def destroy
    product_calculation = ProductCalculation.find_by(product_id: params[:id])
    ingredient_amount = IngredientAmount.find_by(product_id: params[:id])

    product_calculation.destroy
    ingredient_amount.destroy

    render json: 'removed'
  end

  private
  def product_calculation_params
    params.require(:product_calculation)
  end
end