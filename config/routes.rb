Rails.application.routes.draw do
  



  get "posts/create", to: "posts#create_post"

  post "posts/publish", to: "posts#publish"

  resources :posts 
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
