class StocksController < ApplicationController
  before_action :authorize
  before_action :authorize_admin

  def create
    stock = Stock.new(stock_params)
    if stock.save
      render json: stock
    else
      render json: stock.errors.full_messages
    end
  end
  def index
    stock = Stock.all
    render json: StockBlueprint.render(stock,view: :stock)
  end
  def update
    stock = Stock.find(params[:id])
    if stock.update(stock_params)
      render json: stock
    else
      render stock.errors.full_messages
    end
  end

  def show
    stock = Stock.find(params[:id])
    render json: stock
  end

  private

  def stock_params
    params.require(:stock).permit(:name,:price,:amount,:measure_unit_id)
  end
end
