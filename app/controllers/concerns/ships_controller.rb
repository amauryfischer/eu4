class ShipsController
  def get
    @ship = Ship.find(params[:id])
    render json: @ship
  end

  def update
    @ship = Ship.find(params[:id])
    @ship.update(ship_params)
    render json: @ship
  end

  def create
    @ship = Ship.new(ship_params)
    @ship.save
    render json: @ship
  end
end
