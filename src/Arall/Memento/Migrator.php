<?php

namespace Arall\Memento;

class Migrator
{
    private $source;
    private $migrations = [];

    public function __construct($source)
    {
        $this->source = $source;
        $this->loadMigrations();
    }

    private function loadMigrations()
    {
        foreach (glob($this->source . '/*.php') as $migration) {
            require_once($migration);
            $this->migrations[] = basename($migration, '.php');
        }
    }

    public function run()
    {
        foreach ($this->migrations as $migration) {
            $migration = new $migration;
            $migration->run();
        }
    }
}
