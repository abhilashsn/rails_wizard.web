RailsWizard::Application.routes.draw do
  root :to => 'templates#new'

  resources :templates
  resources :recipes
  resources :users
  
  match '/auth/sign_out', :to => 'sessions#destroy', :as => 'sign_out'
  match '/auth/:provider/callback', :to => 'sessions#create'
  match '/auth/failure', :to => 'sessions#fail'
    
  match '/:id.rb', :to => 'templates#compile', :as => 'compile'    
  match '/:id', :to => 'templates#show', :as => 'show'
  match '/:id/edit', :to => 'templates#edit', :as => 'edit'
  match '/:id/edit/:step', :to => 'templates#edit', :as => 'step'
end
