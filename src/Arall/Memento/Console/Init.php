<?php

namespace Arall\Memento\Console;

use Arall\Memento\Migrator;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Database initialization command.
 */
class Init extends Command
{
    public function configure()
    {
        $this
            ->setName('init')
            ->setDescription('Initialize an empty database');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $migrator = new Migrator('src/Arall/Memento/Migrations');
        $migrator->run();

        $output->writeln('Database migrated successfully');
    }
}
