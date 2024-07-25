module Statistics
  class StatisticsController < ApplicationController
    def data
      products = statics_params[:products].map { |id| ActiveRecord::Base.connection.quote(id) }.join(', ')
      start_date = ActiveRecord::Base.connection.quote(statics_params[:start_date])
      end_date = ActiveRecord::Base.connection.quote(statics_params[:end_date])
      query = "
      SELECT products.name, SUM(ordered_products.amount)
          FROM ordered_products
          LEFT JOIN products ON ordered_products.product_id = products.id
      where products.id IN (#{products}) AND ordered_products.created_at BETWEEN
      #{start_date} and #{end_date}
      GROUP BY products.name;
      "
      render json: ActiveRecord::Base.connection.execute(query)
    end
    def statics_params
      params.permit(:start_date,:end_date,products: [])
    end
  end
end