class SellTypesController < ApplicationController
  def index
    sell_types = SellType.all
    render json: sell_types
  end
  def create
    sell_type = SellType.new(sell_type_params)
    if sell_type.save
      render json: sell_type
    end
  end
  private
  def sell_type_params
    params.permit(:name)
  end
end
