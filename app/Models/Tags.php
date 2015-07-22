<?php

namespace app\Models;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tags';

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
