class PostsController < ApplicationController
    layout "react_layout"

    def index
        @posts_props = {
            url: ENV["URL"],
            posts: Post.all,
            users: User.all
        }
    end

    def new
        @post_props = {
            url: ENV["URL"]
        }
    end

    def show
        @post = Post.find(params[:id])

        @post_props = {
            url: ENV["URL"],
            post: @post,
            current_user: current_user
        }
    end

    def update 
        @post = Post.find(params[:id])
        @post.title = params[:title]
        @post.body = params[:body]
        @post.save

    end

    def create
        byebug
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        @post.author = current_user.username
        @post.save
    end

    def post_params
        params.permit(:title, :body, :user_id)
    end
end
