require "test_helper"

class Api::WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_welcome_index_url
    assert_response :success
  end
end
