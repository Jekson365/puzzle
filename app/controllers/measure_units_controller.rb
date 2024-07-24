class MeasureUnitsController < ApplicationController
  before_action :authorize_request
  def create
    measure_unit = MeasureUnit.new(measure_unit_params)
    if measure_unit.save
      render json: measure_unit
    else
      render json: measure_unit.errors.full_messages
    end
  end

  def index
    render json: MeasureUnit.all
  end

  private
  def measure_unit_params
    params.require(:measure_unit).permit(:unit)
  end

  def authorize_request
    unless logged_in?
      render json: 'unauthorized'
    end
  end
end
