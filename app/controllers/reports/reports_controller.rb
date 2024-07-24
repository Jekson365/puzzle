module Reports
  class ReportsController < ApplicationController
    def report
      result = Reports::ReportService.new(report_params).report
      render json: result.as_json
    end

    private
    def report_params
      params.permit(:start_date,:end_date,:name)
    end
  end
end