<?php

use Arall\Memento\Contracts\Migration;
use Lazer\Classes\Database as Lazer;

class MemoryTableMigration implements Migration
{
    public function run()
    {
        Lazer::create('memories', array(
            'id'   => 'integer',
            'text' => 'string',
        ));
    }
}
