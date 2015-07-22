<?php

namespace app\Models;

use Jenssegers\Mongodb\Model as Eloquent;

class Tags extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $collection = 'tags';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

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
     * Memories relation.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function memories()
    {
        return $this->belongsToMany('App\Models\Memory', 'memories_tags', 'tag_id', 'memory_id');
    }
}
