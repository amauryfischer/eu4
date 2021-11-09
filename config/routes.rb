Rails.application.routes.draw do
  get '/', to: 'app#index'
  get '*path', to: 'app#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
