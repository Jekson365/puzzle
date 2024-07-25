module Reports
  class ReportsController < ApplicationController
    def report
      result = Reports::ReportService.new(report_params).report
      render json: result.as_json
    end

    def current_product_details
      result = Reports::ReportService.new(product_params).current_product
      render json: result
    end

    private

    def report_params
      params.permit(:start_date, :end_date, :name)
    end

    def product_params
      params.permit(:product_id)
    end
  end
end