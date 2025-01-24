class TobyUsersController < ApplicationController
    def create
        user = TobyUser.new(toby_params);

        if user.save
            render json:{message: "user Saved Successfully", user: user};
        else
            render json: { error: "Something went wrong", details: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def search
        user = TobyUser.where(admin_user_id: params[:admin_user_id]);
        if user
             render json:{message:"Hello", admin_id: params[:admin_user_id] , user: user}
        end
    end

    def destroy
        user = TobyUser.find_by(user_id: params[:id]);
        if user
            user.destroy
            render json:{message: "User Deleted Successfully"}, status: :ok
          else
            render json:{message: "User Not Found"} , status: :not_found
          end
    end

    private
    def toby_params
        params.require(:toby_user).permit( :admin_user_id, :user_id, :user_name);
    end
end
