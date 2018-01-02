<?php
/**
 * Users model to manage CRUD operation and relations of users table.
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    /**
     * @var boolean
     */
    public $timestamps = true;

    /**
     * @var null|string
     */
    protected $table = 'users';
}
