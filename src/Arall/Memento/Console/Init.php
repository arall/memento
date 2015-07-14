<?php

namespace Arall\Memento\Console;

use Arall\Memento\Database;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\question;

/**
 * Database initialization command.
 */
class Init extends Command
{
    /**
     * Default owner name.
     *
     * @var string
     */
    private static $default_owner = 'anon';

    /**
     * Default output filename.
     *
     * @var string
     */
    private static $default_output = 'mydatabase.json';

    public function configure()
    {
        $this
            ->setName('init')
            ->setDescription('Initialize an empty database')
            ->addArgument(
                'name',
                InputArgument::OPTIONAL,
                'Owner name'
            )
            ->addArgument(
                'output',
                InputArgument::OPTIONAL,
                'Output path'
            )
        ;
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        // Name wasn't provided?
        if (! $name = $input->getArgument('name')) {
            // Set the default
            $name = self::$default_owner;
        }

        // Output wasn't provided?
        if (! $output_file = $input->getArgument('output')) {
            // Set the default
            $output_file = self::$default_output;
        }

        // Initialize!
        $output->writeln('Initializing a database for <info>' . $name . '</info> in <comment>' . $output_file . '</comment>');

        $database = new Database($output_file);
        $database->setOwner($name);
        $database->save();
    }
}
