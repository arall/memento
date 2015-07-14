<?php

namespace Arall\Memento;

use Arall\Memento\IO;

/**
 * Database main class.
 */
class Database
{
    /**
     * Database reader / writer.
     *
     * @var IO
     */
    private $io;

    public function __construct($file)
    {
        $this->io = new IO($file);
    }

    /**
     * Set the owner name.
     *
     * @param string $name
     *
     * @return bool
     */
    public function setOwner($name)
    {
        return $this->io->push('owner', $name);
    }

    /**
     * Get the owner name.
     *
     * @return string
     */
    public function getOwner()
    {
        return $this->io->pull('owner');
    }

    /**
     * Store the current database.
     *
     * @return bool
     */
    public function save()
    {
        return $this->io->write();
    }
}
