Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, 'sJUicVCxJRQZwP0qg7fZFg', 'RphzejhfQ6GfGJRqRU36aoHQU3yD8QZuE5dRYrwfNQ'
  provider :github, '272c27e99506d11f2b73', 'a8ae4c8dcd12250c894468f4503e364342bf9d55'
  provider :google_apps, OpenID::Store::Mongo.new, :domain => 'intridea.com', :name => 'admin'
end