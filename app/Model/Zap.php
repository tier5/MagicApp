<?php
/**
 * Zap model to manage CRUD operation and relations of zap table.
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Zap extends Model
{
    /**
     * @var boolean
     */
    public $timestamps = true;

    /**
     * @var null|string
     */
    protected $table = 'zap';
}
