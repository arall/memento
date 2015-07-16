<?php

namespace Arall\Memento\Contracts;

use Lazer\Classes\Database as Lazer;

abstract class Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table;

    /**
     * The attributes.
     *
     * @var array
     */
    protected $fields = array();

    protected $attributes;

    /**
     * Create a new model instance.
     *
     * @param  array $attributes
     * @return void
     */
    public function __construct(array $attributes = array())
    {
        $this->fields = $this->getConnector()->fields();
        $this->fill($attributes);
    }

    /**
     * Fill the model with an array of attributes.
     *
     * @param array $attributes
     *
     * @return $this
     */
    public function fill(array $attributes)
    {
        foreach ($this->fillableFromArray($attributes) as $key => $value) {
            $this->setAttribute($key, $value);
        }

        return $this;
    }

    /**
     * Get the fillable attributes of a given array.
     *
     * @param array $attributes
     *
     * @return array
     */
    protected function fillableFromArray(array $attributes)
    {
        if (count($this->fields) > 0) {
            return array_intersect_key($attributes, array_flip($this->fields));
        }

        return $attributes;
    }

    /**
     * Set a given attribute on the model.
     *
     * @param string $key
     * @param mixed  $value
     *
     * @return void
     */
    public function setAttribute($key, $value)
    {
        $this->attributes[$key] = $value;
    }

    /**
     * Returns a database row object pointing the model table, with all the attributes set.
     *
     * @return Lazer
     */
    protected function loadAttributes()
    {
        $row = $this->getConnector();
        
        if (count($this->attributes) > 0) {
            foreach ($this->attributes as $key => $value) {
                $row->$key = $value;
            }
        }

        return $row;
    }

    public function save()
    {
        $row = $this->loadAttributes();

        return $row->save();
    }

    public function delete()
    {
        $query = $this->getConnector();

        return $query
            ->find($this->id)
            ->delete();
    }

    /**
     * Returns a database object, pointing the model table.
     *
     * @return Lazer
     */
    protected function getConnector()
    {
        return Lazer::table($this->table);
    }
}
