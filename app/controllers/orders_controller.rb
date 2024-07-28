class OrdersController < ApplicationController
  # before_action :authorize
  def create
    order = Order.new(order_params)
    if order.save
      render json: order
    else
      render json: order.errors.full_messages
    end
  end

  def change_status
    order = Order.find(params[:id])
    order.ready = true
    order.save
    balance_reports(params[:id])
    render json: order
  end

  def index
    orders = Order.all
    render json: orders
  end

  def show
    order = Order.find(params[:id])
    render json: OrderBlueprint.render(order, view: :check)
  end

  def balance_reports(order_id)
    order = Order.find(order_id)
    ordered_products = order.ordered_products
    ordered_products.each do |product|
      if product.product.sell_type.name == 'ცალი'
        stock = product.product.stocks.first
        stock.amount -= product.amount
        stock.save
      else
        product.ordered_types.each do |ordered|
          if ordered.more
            stock = Stock.find(ordered.stock_id)
            ingredient_amount = IngredientAmount.where(stock_id: ordered.stock_id, product_id: product.product_id).first
            stock.amount -= ingredient_amount.more
            stock.save
          else
            if ordered.more == false && ordered.less == true
              stock = Stock.find(ordered.stock_id)
              ingredient_amount = IngredientAmount.where(stock_id: ordered.stock_id, product_id: product.product_id).first
              stock.amount -= ingredient_amount.less
              stock.save
            end
          end
        end
      end
    end
  end

  private

  def order_params
    params.require(:orders).permit(
      :total_price,
      ordered_products_attributes: [
        :product_id, :amount,
        ordered_types_attributes: [:ordered_product_id, :stock_id, :more, :less]
      ]
    )
  end

end