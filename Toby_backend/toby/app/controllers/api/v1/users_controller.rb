class Api::V1::UsersController < ApplicationController
  def create
    user = ::User.new(user_params)

    if user.save
      render json: { message: "User saved successfully", user: user }, status: :created
    else
      render json: { error: "Something went wrong", details: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  def user_params
      params.require(:user).permit( :first_name, :last_name, :email, :password);
  end
end
