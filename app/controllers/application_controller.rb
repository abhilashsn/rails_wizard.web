class ApplicationController < ActionController::Base
  protect_from_forgery
  layout 'application'
  
  before_filter do
    redirect_to 'http://railswizard.org/' if request.host == 'railswizard.r10.railsrumble.com'
  end
  
  protected
  
  def signed_in?
    !!current_user
  end
  
  def current_user
    @current_user ||= User.find(session[:user_id])
  end
  
  def current_user=(user)
    session[:user_id] = user.id
    @current_user = user    
  end
  
  def admin?
    signed_in? && current_user.admin?
  end
  
  def login_required
    unless signed_in?
      flash[:alert] = 'You must be signed in to access that area of the site.'
      redirect_to @back || :back
    end
  end
  
  def admin_required
    unless admin?
      flash[:alert] = 'You must be an admin to access that.'
      redirect_to @back || :back
    end
  end
  
  helper_method :signed_in?, :current_user, :admin?
end
