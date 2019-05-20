class PostsController < ApplicationController
    layout "react_layout"

    before_action :require_login, only: :create

    def index

        @posts = Post.all.select { |p| p.published === true}

        @posts_props = {
            url: ENV["URL"],
            posts: @posts,
            users: User.all,
            current_user: current_user
           
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
        @post = Post.new(post_params)
        @post.title = "Your New Post"
        @post.body = '{"blocks":[{"key":"f49gb","text":"Your post body goes here...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
        @post.user_id = current_user.id
        @post.author = current_user.username
        @post.published = false
        @post.save

        redirect_to action: "show", id: @post.id 


    end

    def publish
        @post = Post.find(params[:id])
        @post.published = !@post.published
        @post.save
    end

    def post_params
        params.permit(:title, :body, :user_id)
    end
end
