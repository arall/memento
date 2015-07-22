<?php

namespace App\Models;

use Jenssegers\Mongodb\Model;

class Memory extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $collection = 'memories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'text', 'day', 'month', 'year', 'privacy'];

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
     * Persons relation.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function persons()
    {
        return $this->belongsToMany('App\Models\Person', 'memories_persons', 'memory_id', 'person_id');
    }

    /**
     * Tags relation.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag', 'memories_tags', 'memory_id', 'tag_id');
    }
}
