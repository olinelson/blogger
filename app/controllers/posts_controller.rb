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
            current_user: current_user,
        }
    end

    def update 
        @post = Post.find(params[:id])
        @post.title = params[:title]
        @post.body = params[:body]
        @post.save

    end

    def new

        @post = Post.new(post_params)
        @post.title = "Your New Post"
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

    def destroy
    
        @post = Post.find(params[:id])
        user_id = @post.user_id
        @post.delete
        # redirect_to :controller => 'users', :action => 'show', id: user_id
        redirect_to action: "index"
    end

    def add_image
        byebug
        @post = Post.find(params[:post_id])
        file = params[:file]
        @post.images.attach(file)

    end

    def post_params
        params.permit(:title, :body, :user_id)
    end


end
