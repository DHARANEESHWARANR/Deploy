Rails.application.routes.draw do
  devise_for :auth_users, controllers: { omniauth_callbacks: 'auth_users/omniauth_callbacks' }
  
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      resources :collections do
        resources :bookmarks
      end
      post 'login', to: 'sessions#create' # Custom route for login
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
