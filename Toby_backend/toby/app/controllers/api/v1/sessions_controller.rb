class Api::V1::SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
      puts "-----------------------------"
      puts "-----------------------------"
      puts "-----------------------------"
      puts user
      puts "-----------------------------"
      puts "-----------------------------"
      puts "-----------------------------"
      if user && user.authenticate(params[:password])
        render json: { message: "Login successful", user: user }, status: :ok
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end
  end
  