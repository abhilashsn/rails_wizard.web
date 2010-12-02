module ApplicationHelper
  include TweetButton
  
  def generate_toc(truth)
    ('<script type="text/javascript" charset="utf-8">var generateTOC = ' + (!!truth).to_s + ';</script>').html_safe
  end
  
  def bespin_setup(dom_id)
    render "layouts/bespin", :dom_id => dom_id
  end
end
