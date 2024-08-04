Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  # get '*path', to: 'static#index', constraints: ->(req) { !req.xhr? && req.format.html? }

  # Defines the root path route ("/")
  # root "posts#index"s

  resources :stocks
  resources :measure_units
  resources :products
  resources :ingredient_amounts
  resources :orders
  resources :product_calculations
  resources :categories
  resources :sell_types
  resources :notes

  namespace :employees do
    resources :employees
    resources :positions
    resources :statuses
    resources :employees_history
  end
  namespace :statistics do
    post '/statistic', to: 'statistics#data'
  end

  scope "/export" do
    post "/report", to: 'reports/reports#report_xlsx'
  end

  namespace :reports do
    post "/products", to: 'reports#report'
    post '/product_details', to: 'reports#current_product_details'
  end

  post '/show_by_cat', to: 'products#show_by_category'
  post '/change_order_status/:id', to: 'orders#change_status'
  post '/change_note_status', to: 'notes#change_status'

  # auth
  post '/login', to: "auth#login"
  post '/register', to: 'users#register'
  post '/user', to: 'users#get_current_user'
  post '/make_admin',to: 'users#make_admin'

end
