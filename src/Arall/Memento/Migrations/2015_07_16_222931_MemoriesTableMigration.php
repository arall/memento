<?php

use Arall\Memento\Contracts\Migration;
use Lazer\Classes\Database as Lazer;
use Lazer\Classes\Relation;

class MemoriesTableMigration implements Migration
{
    public function run()
    {
        Lazer::create('memories', array(
            'id'   => 'integer',
            'text' => 'string',
        ));

        Relation::table('memories')
            ->hasMany('persons')
            ->localKey('id')
            ->foreignKey('id')
            ->setRelation();
    }
}
