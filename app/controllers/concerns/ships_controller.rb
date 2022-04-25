class ShipsController < ApplicationController
  def get_all
    @ships = Ship.all
    render json: @ships.map(&:to_format)
  end

  def update
    @ship = Ship.find(params[:id])
    @ship.update(ship_params)
    render json: @ship
  end

  def create
    @ship = Ship.create(data: params.permit!.to_h)
    render json: @ship.to_format
  end
end
