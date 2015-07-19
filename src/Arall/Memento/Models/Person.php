<?php

namespace Arall\Memento\Models;

use Arall\Memento\Contracts\Model;

class Person extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'persons';
}
