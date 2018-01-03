<?php
/**
 * Zap model to manage CRUD operation and relations of zap table.
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Zapfilds extends Model
{
    /**
     * @var boolean
     */
    public $timestamps = true;

    /**
     * @var null|string
     */
    protected $table = 'zap_filds';
}
