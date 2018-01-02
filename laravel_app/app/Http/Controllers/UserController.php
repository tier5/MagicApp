<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response,Auth,Hash;
use App\Model\Users;

class UserController extends Controller
{
    public function userLogin(Request $request)
    {
        $email    = $request->email; //email id for login
        $password = $request->password; //password for login

        // Validation of login form
        $validator = \Validator::make($request->all(), [
            'email'    => 'required',
            'password' => 'required|min:6'
        ]);

        if($validator->fails()) {

            return Response::json(array(
                'status'   => false,
                'error'    => true,
                'code'     => 400,
                'response' => $validator->messages(),
                'message'  => null
            ));

        }

        // Merge email and userName for login
        $field                  = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $request->merge([$field => $request->input('email')]);
        $credentials            = $request->only($field, 'password');
        //$credentials            = array_add($credentials, 'profile_status', '1'); //If profile status !1 then user is not Active

        if(Auth::attempt($credentials)) { //Attempt Auth login

            $response = ['userId'=>Auth::user()->id,'userToken'=>Auth::user()->user_token];

            return Response::json(array(
                'status'   => true,
                'code'     => 200,
                'error'    => false,
                'response' => $response,
                'message'  => "Logged in Successfully."
            ));

        } else {

            return Response::json(array(
                'status'  => false,
                'code'    => 400,
                'error'   => true,
                'response'=> [],
                'message' => 'Invalid email or password!'
            ));

        }
    }

    public function userSignUp(Request $request)
    {
        $name       = $request->name;
        $email      = trim($request->email);
        $password   = $request->password;

        if($email!="")
        {
            $checkEmailExist = Users::where('email',$email)->first(); //Check email exist
            if(count($checkEmailExist)==0)
            {
                $userToken                = $this->generateRandomString(); //generate Random token for the user

                $saveUser                 = new Users;
                $saveUser->name           = $name;
                $saveUser->email          = $email;
                $saveUser->password       = Hash::make($password);
                $saveUser->user_token     = $userToken;
                if($saveUser->save())
                {
                    $response = ['userId'=>$saveUser->id,'userToken'=>$saveUser->user_token,'email'=>$saveUser->email,'name'=>$saveUser->name];
                    return Response()->json([
                        'code'    => 200,
                        'success' => true,
                        'error'   => false,
                        'status'  => true,
                        'response'=> $response,
                        'message' => 'Admin User Saved !'
                    ]);
                }else{

                    return Response()->json([
                        'code'    => 400,
                        'success' => false,
                        'error'   => true,
                        'status'  => false,
                        'response'=> $saveUser,
                        'message' => 'Admin User Saved !'
                    ]);

                }

            }else{

                return Response()->json([
                    'code'    => 400,
                    'error'   => true,
                    'success' => false,
                    'status'  => false,
                    'response'=> [],
                    'message' => 'Email ID exist,please choose new email id !'
                ]);
            }
        }else{
            return Response()->json([
                'code'    => 400,
                'error'   => true,
                'success' => false,
                'status'  => false,
                'response'=> [],
                'message' => 'Please provide valid data !'
            ]);
        }
    }

    /**
     * Generate random String
     * @return String
     */
    function generateRandomString()
    {
        $length           = 16;
        $characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString     = '';

        for ($i = 0; $i < $length; $i++) {

            $randomString .= $characters[rand(0, $charactersLength - 1)];

        }

        return $randomString;
    }
}
