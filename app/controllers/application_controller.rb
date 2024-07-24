class ApplicationController < ActionController::API
  def authorize_admin
    unless @current_user.admin?
      render json: 'you don have access'
    end
  end
  def authorize
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find(decode_token['user_id']) if decode_token
  end

  def decode_token
    if auth_header
      begin
        JWT.decode(token, 'helloworld', true, algorithm: 'HS256')[0]
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def encode_token(payload)
    JWT.encode(payload, 'helloworld')
  end

  def auth_header
    request.headers['Authorization']
  end

  def token
    auth_header.split(' ').last if auth_header
  end
end
