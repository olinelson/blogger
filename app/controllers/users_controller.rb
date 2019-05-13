class UsersController < ApplicationController
    layout "react_layout"
    
    def show
        @user = User.find(params[:id])
        @published_posts = @user.posts.select{ |p| p.published === true }
        @unpublished_posts = @user.posts.select{ |p| p.published === false }

        @user_props = {
            url: ENV["URL"],
            user: @user,
            current_user: current_user,
            published_posts: @published_posts,
            unpublished_posts: @unpublished_posts
        }

    end
end
