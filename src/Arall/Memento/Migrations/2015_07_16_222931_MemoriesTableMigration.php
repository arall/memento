<?php

use Arall\Memento\Contracts\Migration;
use Lazer\Classes\Database as Lazer;
use Lazer\Classes\Relation;

class MemoriesTableMigration implements Migration
{
    public function up()
    {
        Lazer::create('memories', array(
            'id'   => 'integer',
            'text' => 'string',
        ));

        Relation::table('memories')
            ->hasAndBelongsToMany('persons')
            ->localKey('id')
            ->foreignKey('id')
            ->setRelation();

        Relation::table('memories')
            ->hasAndBelongsToMany('tags')
            ->localKey('id')
            ->foreignKey('id')
            ->setRelation();
    }

    public function down()
    {
        Lazer::remove('memories');
    }
}
