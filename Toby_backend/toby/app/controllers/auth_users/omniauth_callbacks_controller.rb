class AuthUsers::OmniauthCallbacksController < Devise::OmniauthCallbacksController

    def google_oauth2
      @auth_user = AuthUser.from_omniauth(request.env['omniauth.auth'])
      if @auth_user.persisted?
        sign_in_and_redirect @auth_user, event: :authentication
        flash[:notice] = "Successfully authenticated from Google account." if is_navigational_format?
      else
        session['devise.google_data'] = request.env['omniauth.auth'].except('extra')
        redirect_to new_auth_user_registration_url, alert: @auth_user.errors.full_messages.join("\n")
      end
    end
  end
  