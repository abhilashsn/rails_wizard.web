class TemplatesController < ApplicationController
  before_filter :template, :only => [:edit, :show, :destroy, :compile]
  before_filter do
    @page_title = template.name if template
  end
  
  def index
    @page_title = "Template Directory"
    @templates = RailsTemplate.listed.recent.limit(30)
    render :action => 'index', :layout => 'application'
  end
  
  def new
    @toc = true
    @template = RailsTemplate.new
  end
  
  def create
    @template = RailsTemplate.new(params[:rails_template])
    @template.user = current_user if signed_in?
    
    if @template.save
      redirect_to show_path(@template)
    else
      flash[:alert] = 'Unable to create a template. Something is wrong.'
      redirect_to root_path
    end
  end
  
  def edit
    @toc = true
    params[:step] ||= 'app_info'
    @heading = params[:step].titleize
    @page_title = "Editing '#{template.name}'"
  end
  
  def compile
    render :action => 'compile', :content_type => 'text/plain', :layout => false
  end
  
  def update
    if template.update_attributes(params[:rails_template])
      redirect_to next_state
    else
      flash.now[:alert] = 'Unable to update template.'
      render :action => params[:step]
    end
  end
  
  def show
    @page_title = template && template.name?? "#{template.name}".html_safe : "Your Template"
    @heading = 'Generate Your Application'
    render :action => 'show', :layout => 'application'
  end
  
  protected
  
  def next_state
    case params[:commit]
      when 'Next Step'
        step_path(template, next_step)
      when 'Previous Step'
        step_path(template, previous_step)
      when 'Finish'
        show_path(template)
    end
  end
  
  def template
    @template ||= RailsTemplate.from_param(params[:id])
  end
  helper_method :template
  
  def next_step
    RailsTemplate::STEPS[RailsTemplate::STEPS.index(params[:step]) + 1]
  end
  
  def previous_step
    RailsTemplate::STEPS[RailsTemplate::STEPS.index(params[:step]) - 1]
  end
  
  helper_method :next_step, :previous_step
end
