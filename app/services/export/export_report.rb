require 'axlsx'
require 'caxlsx'

module Export
  class ExportReport
    def initialize(data, filename)
      @data = data
      @filename = filename
      @init = Axlsx::Package.new
    end

    def generate_xlsx
      wb = @init.workbook

      wb.add_worksheet(name: "Data Export") do |sheet|
        sheet.add_row @data.first.keys

        @data.each do |record|
          sheet.add_row record.values
        end
      end

      file_path = Rails.root.join('public', 'exports', "#{@filename}-#{DateTime.now.to_i}.xlsx")
      @init.serialize(file_path)

      file_path
    end
  end
end
