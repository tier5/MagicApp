<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response,Auth,Hash;
use App\Model\Users;
use App\Model\Zapiertoken;
use App\Model\Zap;
use App\Model\Zapfields;
use App\Model\Zapdata;

class ZapierController extends Controller
{
    public function getZapDataList($api_key)
    {
        if($api_key!=""){
            $getUserFromApiKey = Zapiertoken::where('token',$api_key)->first();
            if( count($getUserFromApiKey) != 0 ){
                $getUserZaps = Zap::where('user_id',$getUserFromApiKey->user_id)->get();
                if( count($getUserZaps) !=0 ){
                    $userZaps = array();
                    foreach($getUserZaps as $key=>$value){
                        $userZaps[$key]['zapId'] = $value->id;
                        $userZaps[$key]['zapName'] = $value->zap_name;
                    }
                    return Response::json(array(
                        'status'   => false,
                        'response' => $userZaps,
                        'message'  => 'list of all zap !'
                    ),200);
                }else{
                    return Response::json(array(
                        'status'   => false,
                        'response' => [],
                        'message'  => 'please provide valid data !'
                    ),403);
                }
            }else{
                return Response::json(array(
                    'status'   => false,
                    'error'    => true,
                    'code'     => 400,
                    'response' => [],
                    'message'  => 'please provide valid data !'
                ),403);
            }
        }else{
            return Response::json(array(
                'status'   => false,
                'response' => [],
                'message'  => 'please provide valid data !'
            ),403);
        }
    }

    public function sentZapData($zapId)
    {
        if( $zapId != "" ){

            $getZapData = Zap::where('id',$zapId)->with('params','params.zapData')->get();
            foreach ($getZapData as $key=>$dataValue ){
                $sentZapData = array();
                foreach($dataValue->params as $fieldValue){
                    foreach($fieldValue->zapData as $key=>$value){
                        $sentZapData[$key][$fieldValue->zap_field] = $value->zap_value;
                    }
                }
            }

            return Response::json(array(
                'status'   => false,
                'response' => $sentZapData,
                'message'  => 'valid zap data !'
            ),200);
        }else{

            return Response::json(array(
                'status'   => false,
                'response' => [],
                'message'  => 'please provide valid data !'
            ),403);
        }
    }

    public function saveScriptData(Request $request)
    {
        \Log::info(print_r($request->all(),true));
        $zapId  = $request['zapId'];
        $params = $request['params'];       //array containing params
        if( $zapId != "" ){

            $getAllZapParams = Zapfields::where('zap_id',$zapId)->select('zap_field','validation_id','zap_value')->get();

            if( count($getAllZapParams) != 0 ){

                foreach($getAllZapParams as $key=>$zapparams){
                    foreach($params as $paramsKey=>$paramsValue){
                         // do Something with the data
                    }
                }
            }else{
                return Response::json(array(
                    'status'   => false,
                    'response' => [],
                    'message'  => 'No data found !'
                ),403);
            }
        }else{

            return Response::json(array(
                'status'   => false,
                'response' => [],
                'message'  => 'please provide valid data !'
            ),403);
        }
    }
}
