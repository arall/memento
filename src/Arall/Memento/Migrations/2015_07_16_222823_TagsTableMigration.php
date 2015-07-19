<?php

use Arall\Memento\Contracts\Migration;
use Lazer\Classes\Database as Lazer;
use Lazer\Classes\Relation;

class TagsTableMigration implements Migration
{
    public function up()
    {
        Lazer::create('tags', array(
            'id'   => 'integer',
            'name' => 'string',
        ));
    }

    public function down()
    {
        Lazer::remove('tags');
    }
}
