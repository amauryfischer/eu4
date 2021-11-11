class PlanetsController < ApplicationController
  def get
    @planets = Planet.all
    @planets.each do |planet|
      secondsDifference = Time.now - planet.updated_at
      if secondsDifference > 10
        planet_resources = planet.resources
        planet.resources.keys.each do |resource|
          planet_resources[resource] = planet.resources[resource] + (planet.resourcesMultiplicator[resource] * (secondsDifference / 10)).truncate
        end
        planet.update(resources: planet_resources)
      end
    end
    render json: @planets
  end

  def update
    @planet = Planet.find(params[:id])
    @planet.update(params["data"])
    render json: @planet
  end
end