<?php

namespace Arall\Memento;

use \InvalidArgumentException;

/**
 * IO class.
 * Reads and writes the database file.
 */
class IO
{
    /**
     * Database file path.
     *
     * @var string
     */
    private $file;

    /**
     * Live data.
     *
     * @var array
     */
    private $data = [];

    public function __construct($file)
    {
        $this->file = $file;

        $this->load();
    }

    /**
     * Store a value into the data map.
     *
     * @param string $key
     * @param string $value
     *
     * @return bool
     */
    public function push($key, $value)
    {
        return $this->data[$key] = $value;
    }

    /**
     * Get a value from the data map.
     *
     * @param string $key
     *
     * @return bool
     */
    public function pull($key)
    {
        return isset($this->data[$key]) ? $this->data : null;
    }

    /**
     * Load the database file.
     * If the database doesn't exist, will be created.
     *
     * @throws InvalidArgumentEception
     *
     * @return [type] [description]
     */
    private function load()
    {
        if (file_exists($this->file)) {
            $data = file_get_contents($this->file);
            if ($this->data = self::decode($data)) {
                return true;
            }
            throw new InvalidArgumentException('Database corrupted: ' . $this->file);
        } else {
            return $this->write();
        }
    }

    /**
     * Write the current data into the database.
     *
     * @return bool
     */
    public function write()
    {
        $data = self::encode($this->data);
        if (file_put_contents($this->file, $data)) {
            return true;
        }
        throw new InvalidArgumentException('Database is not writable: ' . $this->file);
    }

    /**
     * Decode a database data.
     *
     * @param string $data Database raw data to be decoded.
     *
     * @return array
     */
    private static function decode($data)
    {
        $data = json_decode($data, true);
        if (is_array($data)) {
            return $data;
        }
    }

    /**
     * Encode a database data.
     *
     * @param array $data Data to be encoded.
     *
     * @return string
     */
    public static function encode($data)
    {
        if ($data = json_encode($data)) {
            return $data;
        }
    }
}
