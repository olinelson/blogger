class UsersController < ApplicationController

    
    def show
        @user = User.find(params[:id])

        @user_props = {
            url: ENV["URL"],
            user: @user,
            current_user: current_user
        }

    end
end
