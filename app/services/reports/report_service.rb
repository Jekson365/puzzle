module Reports
  class ReportService
    def initialize(params)
      @params = params
    end

    def report
      query = "
          SELECT
              orders.current_order_id,
              ordered_products.id,
              products.name,
              ordered_products.amount,
              TO_CHAR(ordered_products.created_at,\'yyyy-MM-dd HH:ss\') as created_at,
              (ordered_products.amount * products.price) as total_price,
              categories.name as category,
              sell_types.name as sell_type
          FROM ordered_products
              LEFT JOIN orders ON ordered_products.order_id = orders.id
              LEFT JOIN products ON ordered_products.product_id = products.id
              LEFT JOIN categories ON products.category_id = categories.id
              LEFT JOIN sell_types ON products.sell_type_id = sell_types.id
          #{filter_string}
              GROUP BY ordered_products.id,
                       orders.current_order_id,
                       products.name,
                       ordered_products.amount,
                       products.price,
                       categories.name,
                       sell_types.name
              ORDER BY orders.current_order_id
      "
      ActiveRecord::Base.connection.execute(query)
    end

    def filter_string
      conditions = []
      start_date = @params['start_date'].present? ? Date.parse(@params['start_date']).beginning_of_day : nil
      end_date = @params['end_date'].present? ? Date.parse(@params['end_date']).end_of_day : Date.today.end_of_day
      name = @params['name'].present? ? "%#{@params['name']}%" : nil

      if start_date && end_date
        conditions << "ordered_products.created_at BETWEEN '#{start_date}' AND '#{end_date}'"
      elsif start_date
        conditions << "ordered_products.created_at BETWEEN '#{start_date}' AND '#{end_date}'"
      end

      conditions << "products.name LIKE '#{name}'" if name

      conditions.any? ? "WHERE #{conditions.join(' AND ')}" : ''
    end

  end
end