Rails.application.routes.draw do
  get '/api/planets', to: 'planets#get'
  put '/api/planets/:id', to: 'planets#update'

  get '/api/ships', to: 'ships#get_all'
  put '/api/ships/:id', to: 'ships#update'
  post '/api/ships', to: 'ships#create'

  get '/api/fleets', to: 'fleets#get_all'
  post '/api/fleets', to: 'fleets#create'
  put '/api/fleets/:id', to: 'fleets#update'

  # fetch parcel details
  get '/api/parcelDetails/:system', to: 'parcel#details'

  get '/', to: 'app#index'
  get '*path', to: 'app#index'
end
