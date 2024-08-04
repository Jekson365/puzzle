class UsersController < ApplicationController
  def register
    user = User.new(register_params)
    if user.save
      token = encode_token({ user_id: user.id })
      render json: { user: user, token: token }, status: :created
    else
      render json: { msg: "something went wrong!" }
    end
  end
  def make_admin
    user = User.find(params[:id])
    user.admin = true
    render json: user
  end
  def get_current_user
    user = User.find(JWT.decode(current_user_params[:token],"helloworld")[0]['user_id'])
    render json: user
  end

  private
  def register_params
    params.require(:user).permit(:email, :password,:password_confirmation)
  end
  def current_user_params
    params.permit(:token)
  end

end