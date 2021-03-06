class RailsTemplate
  include MongoMapper::Document         

  STEPS = %w(orm testing javascript authentication templating customize app_info)

  # Fields
  key :name, String
  key :slug, String
  key :listed, Boolean
  key :description, String
  def description_html; Maruku.new(description).to_html.html_safe end
  belongs_to :user
  
  scope :listed, :listed => true
  scope :recent, :order => [[:updated_at, -1]]

  key :recipes, Array
  key :custom_code, String
  
  attr_protected :user, :user_id
  
  timestamps!
  
  def command_line_options
    recipes.map{|r| r.args}.uniq.join(' ')
  end
  
  # Validations
  validates_presence_of :slug
  validates_uniqueness_of :slug
  
  def can_edit?(user)
    self.user.nil? || (user.id == self.user_id if user)
  end
  
  def recipes
    super.map{|key| RailsWizard::Recipes[key]}
  end

  # Params
  def to_param
    self.slug
  end
  
  def self.from_param(slug)
    RailsTemplate.find_by_slug(slug)
  end
  
  def name
    super.blank?? slug : super
  end
  
  def app_info?; !self.listed.nil? end
  def testing?; self.unit_testing? || self.integration_testing? end
  def customize?; self.custom_code? end
  
  # Slug Generation
  before_validation :set_slug, :on => :create
  
  def set_slug
    if new_record? && self.slug.nil?
      self.slug = self.class.generate_private_slug
    end
  end
  
  POOL = %w(x v l 5 4 b 8 i 1 z 9 t s 3 j c m n e d q k g y r 6 0 a f h w p 2 u o 7)
  def self.generate_slug(count = RailsTemplate.count)
    return if count < 0
    "#{generate_slug(((count / POOL.size) - 1))}#{POOL[count - ( (count / POOL.size) * POOL.size )]}"
  end
  
  def self.generate_private_slug
    ActiveSupport::SecureRandom.hex(10)
  end
end
