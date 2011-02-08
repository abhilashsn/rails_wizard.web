class RecipesController < ApplicationController
  layout 'recipe'
  
  before_filter do
    @page_title = "RailsWizard Recipes"
    @back = '/'
    if signed_in?
      @user_pending_recipes = Recipe.where(:user_id => current_user.id).pending
      @user_recipes = Recipe.where(:user_id => current_user.id).approved
    end
  end
  
  before_filter :login_required, :only => [:create, :new, :edit, :update]
  before_filter :access_required, :only => [:edit, :update]
  before_filter :admin_required, :only => [:moderate, :toggle]
  
  def index
    render :text => 'Not Ready'
    @heading = "All Recipes"
    @recipes = Recipe.all(:order => [['category', 1]])
  end
  
  def new
    @heading = "Create a New Recipe"
  end
  
  def create
    @recipe = Recipe.new(params[:recipe])
    @recipe.user = current_user
    if @recipe.save
      redirect_to recipe
    else
      flash.now[:alert] = 'Error creating recipe.'
      render :action => 'new'
    end
  end
  
  def show
    @heading = "Recipe: <em>#{recipe.name}</em>".html_safe
  end
  
  def moderate
    @pending_recipes = Recipe.pending
    @recipes = Recipe.approved
  end
  
  def toggle
    @recipe = Recipe.from_param(params[:id])
    
    @recipe.approved = !@recipe.approved?
    if @recipe.save
      flash[:notice] = "Toggled successfully."
    else
      flash[:alert] = "Something went wrong."
    end
    redirect_to :back
  end
  
  def update
    if recipe.update_attributes(params[:recipe])
      redirect_to recipe_path(recipe)
    else
      flash[:alert] = 'Error saving recipe.'
      redirect_to :back
    end
  end
  
  protected
  
  def recipe
    @recipe ||= Recipe.from_param(params[:id]) || Recipe.new
  end
  helper_method :recipe
  
  def access_required
    unless current_user.admin? || @recipe.user == current_user
      flash[:alert] = "You don't have permission to edit that."
      redirect_to :back
    end
  end
end
