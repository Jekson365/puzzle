module Reports
  class ReportsController < ApplicationController
    def report
      result = Reports::ReportService.new(report_params).report
      render json: result.as_json
    end

    def report_xlsx
      export_service = Export::ExportReport.new(params[:data], params[:filename])
      file_path = export_service.generate_xlsx

      send_file file_path, filename: File.basename(file_path), type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
