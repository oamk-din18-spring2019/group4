<?php

use \Firebase\JWT\JWT;

class AuthController extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('user');
    $this->load->helper('url_helper');
  }

  public function userExists($column, $value)
  {
    if (empty($this->user->getUser($column, $value))) {
      return false;
    }

    return true;
  }

  public function register()
  {
    $data = array(
      'name' => $this->input->post('name'),
      'email' => $this->input->post('email'),
      'password' => password_hash($this->input->post('password'), PASSWORD_BCRYPT)
    );

    if (!$this->userExists('name', $data['name']) && !$this->userExists('email', $data['email'])) {
      $user = $this->user->insertUser($data);

      $tokenData = [
        'id' => $user[0]['id']
      ];

      $data['access_token'] = JWT::encode($tokenData, 'xxx');


      return $this->output
        ->set_status_header(200)
        ->set_content_type('application/json')
        ->set_output(json_encode(array('access_token' => $data['access_token'])));
    }

    return $this->output
      ->set_status_header(400)
      ->set_content_type('application/json')
      ->set_output(json_encode(array('error' => 'the user already exists')));
  }
}