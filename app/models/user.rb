class User
  include MongoMapper::Document         
  
  key :uid, String
  key :nickname, String
  key :name, String
  key :email, String

  many :recipes
  many :rails_templates
  
  def self.from_hash(auth_hash)
    user = authorize(auth_hash['uid'])
    user ||= User.create(
      :uid => auth_hash['uid'],
      :nickname => auth_hash['user_info']['nickname'],
      :name => auth_hash['user_info']['name'],
      :email => auth_hash['user_info']['email']
    )
  end
  
  def admin?
    (ENV['ADMINS'].split(',') rescue []).include?(nickname)
  end
  
  def self.authorize(uid)
    User.where('uid' => uid).first
  end
end
