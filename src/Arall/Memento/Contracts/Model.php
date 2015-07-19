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
        // Load database fields
        $this->fields = $this->query()->fields();

        // Fill attributes
        $this->fill($attributes);
    }

    /**
     * Fill the model's fillable fields with an array of attributes.
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

    public function save()
    {
        $object = $this->query();

        if (count($this->attributes) > 0) {
            foreach ($this->attributes as $key => $value) {
                $object->$key = $value;
            }
        }

        $object->save();

        // Set id
        $this->setAttribute('id', $object->id);
    }

    public function delete()
    {
        return $this->query()->find($this->id)->delete();
    }

    /**
     * Returns a database object, pointing the model table.
     *
     * @return Lazer
     */
    protected function query()
    {
        return Lazer::table($this->table);
    }

    public static function findOrCreate(array $attributes)
    {
        $object = new static();

        $query = $object->query();
        foreach ($object->fillableFromArray($attributes) as $key => $value) {
            $query->where($key, '=', $value);
        }

        $row = $query->find();
        
        if (isset($row->id)) {
            $object->fill((array)$row);
        } else {
            $object->fill($attributes);
            $object->save();
        }

        return $object;
    }

    /**
     * Returning variable from Object.
     * @param  string $name Field name
     * @return mixed  Field value
     */
    public function __get($name)
    {
        if (isset($this->attributes[$name])) {
            return $this->attributes[$name];
        }
    }

    /**
     * Check if the given field exists.
     * @param  string $name Field name
     * @return bool   True if the field exists, false otherwise
     */
    public function __isset($name)
    {
        return isset($this->attributes[$name]);
    }
}
