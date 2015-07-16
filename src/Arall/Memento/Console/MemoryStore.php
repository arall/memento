<?php

namespace Arall\Memento\Console;

use Arall\Memento\Models\Memory;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;

/**
 * Store a new memory command.
 */
class MemoryStore extends Command
{
    public function configure()
    {
        $this
            ->setName('memory:store')
            ->setDescription('Store a new memory into the database')
            ->addOption(
                'text',
                null,
                InputOption::VALUE_REQUIRED,
                'Memory text'
            );
        ;
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $helper = $this->getHelper('question');

        // Text wasn't provided?
        if (! $text = $input->getOption('text')) {
            // Ask for it
            $question = new Question('What do you remember? ');
            $text = $helper->ask($input, $output, $question);
        }

        // Create a new memory
        $memory = new Memory([
            'text' => $text
        ]);
        $memory->save();

        $output->writeln('<info>Memory stored!</info>');
    }
}
