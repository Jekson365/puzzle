class StaticController < ApplicationController
  def index
    file_path = Rails.root.join('public','build','index.html')
    if File.exist?(file_path)
      send_file file_path, type: 'text/html', disposition: 'inline'
    else
      render plain: "File not found", status: :not_found
    end
  end
end
