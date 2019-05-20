class HomeController < ApplicationController
    layout "react_layout"

    def home 
        render 'home'
    end
end
