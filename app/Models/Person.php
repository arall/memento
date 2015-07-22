<?php

namespace app\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'persons';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'alias'];

    /**
     * User relation.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Real user (related user) relation.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function realUser()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Memories relation.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function memories()
    {
        return $this->belongsToMany('App\Models\Memory', 'memories_persons', 'person_id', 'memory_id');
    }
}
