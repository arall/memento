#! /usr/bin/env php

<?php

use Symfony\Component\Console\Application;

// Composer
if (!file_exists('vendor/autoload.php')) {
    die('Composer dependency manager is needed: https://getcomposer.org/');
}
require 'vendor/autoload.php';

// Database config
define('LAZER_DATA_PATH', realpath(dirname(__FILE__)) . '/data/');

$app = new Application('Memento', '0.1');
$app->add(new Arall\Memento\Console\Init());
$app->add(new Arall\Memento\Console\MemoryStore());
$app->run();
