class ParcelController < ApplicationController
  def details
    @planetsToReturn = Planet.all.filter do |planet|
      planet.data['position']['system'] == params['system']
    end
    @fleetsToReturn = Fleet.all.filter do |fleet|
      fleet.data['position']['system'] == params['system']
    end
    render json: { planets: @planetsToReturn.map(&:to_format), fleets: @fleetsToReturn.map(&:to_format) }
  end
end
