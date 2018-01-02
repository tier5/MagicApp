<?php
/**
 * Zapiertoken model to manage CRUD operation and relations of zapier_token table.
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Zapiertoken extends Model
{
    /**
     * @var boolean
     */
    public $timestamps = true;

    /**
     * @var null|string
     */
    protected $table = 'zapier_token';
}
