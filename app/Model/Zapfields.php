<?php
/**
 * Zap model to manage CRUD operation and relations of zap table.
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Zapfields extends Model
{
    /**
     * @var boolean
     */
    public $timestamps = true;

    /**
     * @var null|string
     */
    protected $table = 'zap_fields';

    public function zapData(){
        return $this->hasMany('App\Model\Zapdata','zap_field_id','id');
    }
}
