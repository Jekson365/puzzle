class SellTypesController < ApplicationController
  def index
    sell_types = SellType.all
    render json: sell_types
  end
end
