class PlanetsController < ApplicationController
  def get
    # ? initialize with at least one planet
    Planet.create_one if Planet.all.count == 0

    @planets = Planet.all
    @planets.each do |planet|
      secondsDifference = Time.now - planet.updated_at
      next unless secondsDifference > 10

      planet_resources = planet.resources
      planet.resources.keys.each do |resource|
        planet_resources[resource] =
          planet.resources[resource] + (planet.resourcesMultiplicator[resource] * (secondsDifference / 10)).truncate
      end
      planet.data['resources'] = planet_resources
      planet.save
    end
    render json: @planets
  end

  def update
    @planet = Planet.find(params[:id])
    @planet.update(params['data'])
    render json: @planet
  end
end
