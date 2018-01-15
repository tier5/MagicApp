<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response,Auth,Hash;
use App\Model\Users;
use App\Model\Zapiertoken;
use App\Model\Zap;
use App\Model\Zapfields;
use App\Model\Zapdata;
use ZapierHelper;

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

    /**
     * Validating params with database params field
     * Storing data from the script into database.
     * @param Request $request
     * @return mixed
     */
    public function saveScriptData(Request $request)
    {
        //Log::info(print_r($request->all(),true));

        $zapId  = $request['zap']['zapId'];

        $params = $request['zap']['params'];       //array containing params
        if( $zapId != "" ){
            $validationCount = 0;
            $zapFieldArray=[];
            $getAllZapParams = Zapfields::where('zap_id',$zapId)->select('id','zap_field','validation_id','zap_value')->get();
            $allParamcount= count($getAllZapParams);
            if( $allParamcount != 0 ){
                foreach($getAllZapParams as $key=>$zapparams){
                    foreach($params as $paramsKey=>$paramsValue){
                        // do Something with the data
                        if ($zapparams->zap_field ==$paramsKey){
                            $zapParam= Zapfields::where('zap_id',$zapId)->where('zap_field',"=",$paramsKey)->select('zap_value','validation_id')->first();
                            if ($zapParam->validation_id == 1){
                                if (count($zapParam)!=0){
                                    $validationCount +=1;
                                    $zapFieldArray[$paramsKey]['zap_id'] = $zapId;
                                    $zapFieldArray[$paramsKey]['zap_field_id']= $zapparams['id'];
                                    $zapFieldArray[$paramsKey]['zap_value']= $paramsValue;
                                    $zapFieldArray[$paramsKey]['url']= $request['zap']['location'];
                                }
                            }else if($zapParam->validation_id == 2){
                                if ($zapParam->zap_value == $paramsValue){
                                    $validationCount +=1;
                                    $zapFieldArray[$paramsKey]['zap_id'] = $zapId;
                                    $zapFieldArray[$paramsKey]['zap_field_id']= $zapparams['id'];
                                    $zapFieldArray[$paramsKey]['zap_value']= $paramsValue;
                                    $zapFieldArray[$paramsKey]['url']= $request['zap']['location'];
                                }
                            }else if($zapParam->validation_id == 3){
                                if ($zapParam->zap_value != $paramsValue){
                                    $validationCount +=1;
                                    $zapFieldArray[$paramsKey]['zap_id'] = $zapId;
                                    $zapFieldArray[$paramsKey]['zap_field_id']= $zapparams['id'];
                                    $zapFieldArray[$paramsKey]['zap_value']= $paramsValue;
                                    $zapFieldArray[$paramsKey]['url']= $request['zap']['location'];
                                }
                            }
                        }
                    }
                }
                if ($validationCount == $allParamcount){
                    foreach($params as $paramsKey=>$paramsValue){
                        if(!array_key_exists($paramsKey, $zapFieldArray)){
                            $saveZapFiels = new Zapfields;
                            $saveZapFiels->zap_id = $zapId;
                            $saveZapFiels->zap_field = $paramsKey;
                            $saveZapFiels->validation_id = 1;
                            $saveZapFiels->zap_value = $paramsValue;
                            $saveZapFiels->save();

                            $zapFieldArray[$paramsKey]['zap_id'] = $zapId;
                            $zapFieldArray[$paramsKey]['zap_field_id']= $saveZapFiels->id;
                            $zapFieldArray[$paramsKey]['zap_value']= $paramsValue;
                            $zapFieldArray[$paramsKey]['url']= $request['zap']['location'];
                        }
                    }
                    foreach ($zapFieldArray as $key=>$zapValue){
                        $saveZapData = new Zapdata;
                        $saveZapData->zap_id = $zapValue['zap_id'];
                        $saveZapData->zap_field_id = $zapValue['zap_field_id'];
                        $saveZapData->zap_value =  $zapValue['zap_value'];
                        $saveZapData->url =  $zapValue['url'];
                        $saveZapData->save();
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
    public function fetchZapData($zapId)
    {
        if( $zapId != "" ) {
            $fetchZapData = Zapdata::where('zap_id',$zapId)->get();
            if (count($fetchZapData)) {
                dd(ZapierHelper::myTest());
                dd($fetchZapData);
                dd($fetchZapData);
                foreach ($fetchZapData as $x=>$each_zap_data) {
                }
                return Response::json(array(
                    'status'   => true,
                    'response' => $fetchZapData,
                    'message'  => 'valid zap data !'
                ),200);
            } else {
                return Response::json(array(
                    'status'   => true,
                    'response' => [],
                    'message'  => 'No data found !'
                ),200);
            }
        } else {
            return Response::json(array(
                'status'   => false,
                'response' => [],
                'message'  => 'No data found !'
            ),403);
        }
    }
}
