class FleetsController < ApplicationController
  def get_all
    @fleets = Fleet.all
    render json: @fleets.map(&:to_format)
  end

  def update
    @fleet = Fleet.find(params[:id])
    @fleet.update(fleet_params)
    render json: @fleet
  end

  def create
    @fleet = Fleet.create(data: params.permit!.to_h['data'])
    render json: @fleet.to_format
  end
end
