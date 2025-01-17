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
        # user = TobyUser.where(admin_user_id: params[:admin_user_id]);
        # p user
        # puts "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        # puts "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        # puts "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        # puts params[:admin_user_id];
        # p params[:admin_user_id];
        # puts "Hello"
        # puts "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        # puts "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        # puts "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        # if user.any?
        #     puts "User Found successfully"
        #     puts "77777777777777777777777"
        #     puts "77777777777777777777777"
        #     puts "77777777777777777777777"
        #     p user
        #     puts "77777777777777777777777"
        #     puts "77777777777777777777777"
        #     render json:{message: "User foun Sucessfully", user: user};
        # else
        #     render json: { message: "No users found for the given admin_id" }, status: :not_found
        # end
        user = TobyUser.where(admin_user_id: params[:admin_user_id]);
        if user
             render json:{message:"Hello", admin_id: params[:admin_user_id] , user: user}
        end
    end

    private
    def toby_params
        params.require(:toby_user).permit( :admin_user_id, :user_id, :user_name);
    end
end
