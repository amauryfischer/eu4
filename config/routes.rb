Rails.application.routes.draw do
  get '/api/planets', to: 'planets#get'
  put '/api/planets/:id', to: 'planets#update'

  get '/api/ships', to: 'ships#get_all'
  put '/api/ships/:id', to: 'ships#update'
  post '/api/ships', to: 'ships#create'

  get '/', to: 'app#index'
  get '*path', to: 'app#index'
end
