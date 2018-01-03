<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response,Auth,Hash;
use App\Model\Users;
use App\Model\Zapiertoken;
use App\Model\Zap;
use App\Model\Zapfields;

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
            ),400);

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
            ),200);

        } else {

            return Response::json(array(
                'status'  => false,
                'code'    => 400,
                'error'   => true,
                'response'=> [],
                'message' => 'Invalid email or password!'
            ),400);

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
                    ],200);
                }else{

                    return Response()->json([
                        'code'    => 400,
                        'success' => false,
                        'error'   => true,
                        'status'  => false,
                        'response'=> [],
                        'message' => 'Admin User Not Saved !'
                    ],400);

                }

            }else{

                return Response()->json([
                    'code'    => 400,
                    'error'   => true,
                    'success' => false,
                    'status'  => false,
                    'response'=> [],
                    'message' => 'Email ID exist,please choose new email id !'
                ],400);
            }
        }else{
            return Response()->json([
                'code'    => 400,
                'error'   => true,
                'success' => false,
                'status'  => false,
                'response'=> [],
                'message' => 'Please provide valid data !'
            ],400);
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

    function createZapierToken(Request $request)
    {
        $tokenName      = $request->tokenName;
        $userId         = $request->userId;
        $zapierToken    = $this->generateRandomString();
        if ($userId != "")
        {
            $checkUser = Users::where('id', $userId)->first();
            if (count($checkUser) != 0)
            {
                $checkZapierToken = Zapiertoken::where('user_id', $userId)->first();
                if (count($checkZapierToken) == 0)
                {
                    $saveToken = new Zapiertoken;
                    $saveToken->user_id = $userId;
                    $saveToken->token_name = $tokenName;
                    $saveToken->token = $zapierToken;
                    $saveToken->status = 1;
                    if ($saveToken->save())
                    {
                        $response = ['tokenName' => $saveToken->token_name, 'token' => $saveToken->token];
                        return Response()->json(['code' => 200, 'success' => true, 'error' => false, 'status' => true, 'response' => $response, 'message' => 'Zapier Token Created !'], 200);
                    } else {

                        return Response()->json(['code' => 400, 'error' => true, 'success' => false, 'status' => false, 'response' => [], 'message' => 'Zapier Token Not Created !'], 400);
                    }
                } else {

                    return Response()->json(['code' => 400, 'error' => true, 'success' => false, 'status' => false, 'response' => [], 'message' => 'Zapier token already exists !'], 400);
                }
            } else {

                return Response()->json(['code' => 400, 'error' => true, 'success' => false, 'status' => false, 'response' => [], 'message' => 'No User Found !'], 400);
            }
        } else {

            return Response()->json(['code' => 400, 'error' => true, 'success' => false, 'status' => false, 'response' => [], 'message' => 'Please provide valid data !'], 400);
        }
    }




    public function createUserZap(Request $request)
    {
        $userId         = $request->user['userId'];
        $zapName        = $request->newZap['zapName'];
        $zapParams      = $request->newZap['params'];
        if ($userId != "" && $zapName != "") {

            $saveZap = new Zap;
            $saveZap->user_id = $userId;
            $saveZap->zap_name = $zapName;
            $saveZap->status = 1;   //1 -->active 2-->deleted
            if ($saveZap->save()) {

                $zapId = $saveZap->id;
                foreach($zapParams as $zapValue){

                    $saveZapFild = new Zapfields;
                    $saveZapFild->zap_id = $zapId;
                    $saveZapFild->zap_field = $zapValue['zapField'];
                    $saveZapFild->zap_value = $zapValue['zapValue'];
                    $saveZapFild->validation_id = $zapValue['validationId'];
                    $saveZapFild->save();
                }

                $getZapResponse = Zap::where('id',$zapId)->with('params')->get();

                return Response()->json([
                    'code' => 200,
                    'error' => false,
                    'success' => true,
                    'status' => true,
                    'response' => $getZapResponse,
                    'message' => 'User zap saved successfully !'
                ], 200);

            } else {

                return Response()->json([
                    'code' => 400,
                    'error' => true,
                    'success' => false,
                    'status' => false,
                    'response' => [],
                    'message' => 'Please provide valid data !'
                ], 400);
            }

        }
    }

    public function userZapList(Request $request)
    {
        $userId = $request->userId;
        if($userId!=""){
            $getUserZapList = Zap::where('user_id',$userId)->get();

            return Response()->json([
                'code'    => 200,
                'success' => true,
                'error'   => false,
                'status'  => true,
                'response'=> $getUserZapList,
                'message' => 'User Zap List !'
            ],200);

        }else{

            return Response()->json([
                'code'      => 400,
                'error'     => true,
                'success'   => false,
                'status'    => false,
                'response'  => [],
                'message'   => 'Please provide valid data !'
            ], 400);
        }
    }

    public function getZapData(Request $request)
    {
        $zapId = $request->zapId;
        if($zapId!=""){
            $getZapData = Zap::where('id',$zapId)->with('params')->get();

            return Response()->json([
                'code'    => 200,
                'success' => true,
                'error'   => false,
                'status'  => true,
                'response'=> $getZapData,
                'message' => 'Zap Data !'
            ],200);

        }else{

            return Response()->json([
                'code'      => 400,
                'error'     => true,
                'success'   => false,
                'status'    => false,
                'response'  => [],
                'message'   => 'Please provide valid data !'
            ], 400);
        }
    }

    public function updateUserZap(Request $request)
    {
        $zapId          = $request->newZap['id'];
        $userId         = $request->user['userId'];
        $zapName        = $request->newZap['zapName'];
        $zapParams      = $request->newZap['params'];

        if($zapId!=""){

            $checkZap = Zap::where('id',$zapId)->first();
            if(count($checkZap)!=""){

                $checkZap->zap_name = $zapName;
                if($checkZap->save()){
                    //delete previous data
                    $deleteZapFild = Zapfields::where('zap_id',$zapId)->delete();
                    foreach($zapParams as $zapValue){

                        $saveZapFild = new Zapfields;
                        $saveZapFild->zap_id = $zapId;
                        $saveZapFild->zap_field = $zapValue['zapField'];
                        $saveZapFild->zap_value = $zapValue['zapValue'];
                        $saveZapFild->validation_id = $zapValue['validationId'];
                        $saveZapFild->save();
                    }

                    $getZapResponse = Zap::where('id',$zapId)->with('params')->get();

                    return Response()->json([
                        'code' => 200,
                        'error' => false,
                        'success' => true,
                        'status' => true,
                        'response' => $getZapResponse,
                        'message' => 'User zap saved successfully !'
                    ], 200);
                }else{

                    return Response()->json([
                        'code'      => 400,
                        'error'     => true,
                        'success'   => false,
                        'status'    => false,
                        'response'  => [],
                        'message'   => 'sorry data not updated !'
                    ], 400);
                }
            }else{

                return Response()->json([
                    'code'      => 400,
                    'error'     => true,
                    'success'   => false,
                    'status'    => false,
                    'response'  => [],
                    'message'   => 'sorry No zap found with the id !'
                ], 400);
            }
        }else{

            return Response()->json([
                'code'      => 400,
                'error'     => true,
                'success'   => false,
                'status'    => false,
                'response'  => [],
                'message'   => 'Please provide valid data !'
            ], 400);
        }
    }

    public function deleteUserZap(Request $request){
        $zapId = $request->zapId;

        if($zapId!=""){
            $deleteZapData = Zap::where('id',$zapId)->with('params')->delete();
            $deleteZapFieldData = Zapfields::where('zap_id',$zapId)->delete();

            return Response()->json([
                'code'    => 200,
                'success' => true,
                'error'   => false,
                'status'  => true,
                'response'=> [],
                'message' => 'Zap Data deleted !'
            ],200);

        }else{

            return Response()->json([
                'code'      => 400,
                'error'     => true,
                'success'   => false,
                'status'    => false,
                'response'  => [],
                'message'   => 'Please provide valid data !'
            ], 400);
        }
    }
}
