Rails.application.routes.draw do
  # Add your extension routes here
  namespace :admin do
      resources :promoted_items
    end
end
