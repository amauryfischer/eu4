Rails.application.routes.draw do
  get '/api/planets', to: 'planets#get'
  put '/api/planets/:id', to: 'planets#update'

  get '/api/ships', to: 'ships#get'

  get '/', to: 'app#index'
  get '*path', to: 'app#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
