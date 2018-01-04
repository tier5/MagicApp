<?php
/**
 * Zapdata model to manage CRUD operation and relations of zap_data table.
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Zapdata extends Model
{
    /**
     * @var boolean
     */
    public $timestamps = true;

    /**
     * @var null|string
     */
    protected $table = 'zap_data';
}
