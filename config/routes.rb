Rails.application.routes.draw do
  # root to: "posts#index"

  

  post "posts/publish", to: "posts#publish"

  get "users/:id", to: "users#show"

  resources :posts
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
