class ShipsController
  def get
    @ship = Ship.find(params[:id])
    render json: @ship
  end
end
