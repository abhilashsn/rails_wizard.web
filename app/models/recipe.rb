class Recipe
  include MongoMapper::Document
  
  key :name, String
  key :slug, String
  key :description, String
  key :category, String
  key :priority, Float
  key :code, String
  key :options, Array
  key :approved, Boolean, :default => false
  belongs_to :user
  
  scope :approved, :approved => true
  scope :pending, :approved => false
  
  many :fields
  
  validates_presence_of :name, :slug
  
  CATEGORIES = [
    ['Javascript','javascript'],
    ['Database/ORM','orm'],
    ['Unit Testing','unit_testing'],
    ['Integration Testing','integration_testing'],
    ['Authentication','authentication'],
#    ['Other','other']
  ]
  
  def options=(opts)
    if opts.is_a?(String)
      opts = opts.split(' ')
    end
    super(opts)
  end
  
  def can_edit?(user)
    user.admin? || self.user == user
  end
  
  def options(array = false)
    array ? super() : super().join(' ')
  end
  
  def self.for(category)
    where(:category => category, :approved => true).order([[:name, 1]])
  end
  
  def self.from_param(param)
    Recipe.find_by_slug(param)
  end
  
  def to_param
    slug
  end
  
  def compile
    "# >#{"[ #{name} ]".center(75,'-')}<\n\n# #{description}\nsay_recipe '#{name}'\n\n#{code}\n"
  end
end