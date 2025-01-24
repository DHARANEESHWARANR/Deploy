class Api::V1::UsersController < ApplicationController
  def create
    if params[:user][:admin_user_id].present?
      admin_user_id = params[:user][:admin_user_id];
      toby_users = TobyUser.where(admin_user_id: admin_user_id);
      puts toby_users.length;
      if toby_users.length >=3
        render json:{message: "Sorry limit reached", details:"Accounts Creation Limits Reached"}, status: :unprocessable_entity
        return
      end
    end

    user = ::User.new(user_params)
    if user.save
      render json: { message: "User saved successfully", user: user }, status: :created
    else
      render json: { error: "Something went wrong", details: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def show
    user = User.find_by(id: params[:id]);
    render json: {message: "Success" ,user: user} 
  end
  
  def destroy
    user = User.find_by(id: params[:id]);
    if user
      user.destroy
      render json:{message: "User Deleted Successfully"}, status: :ok
    else
      render json:{message: "User Not Found"} , status: :not_found
    end
  end
  
  private
  def user_params
      params.require(:user).permit( :first_name, :last_name, :email, :password);
  end
end
