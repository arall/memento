<?php

namespace Arall\Memento\Contracts;

interface Migration
{
    public function up();

    public function down();
}
