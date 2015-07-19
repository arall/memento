<?php

namespace Arall\Memento\Console;

use Arall\Memento\Models\Memory;
use Arall\Memento\Models\Tag;
use Arall\Memento\Models\Person;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Lazer\Classes\Relation;
use Lazer\Classes\Database as Lazer;

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
            )
            ->addOption(
                'tags',
                null,
                InputOption::VALUE_REQUIRED,
                'Tags (coma separated)'
            )
            ->addOption(
                'persons',
                null,
                InputOption::VALUE_REQUIRED,
                'Persons aliases (coma separated)'
            );
        ;
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $text = $this->getOptionOrAsk($input, $output, 'text', 'What do you remember? ');

        $personsString = $this->getOptionOrAsk($input, $output, 'persons', 'Who was in that memory? (coma separated) ');

        $tagsString = $this->getOptionOrAsk($input, $output, 'tags', 'Any tags? (coma separated) ');

        // Search / Create tags
        $tags = [];
        foreach (explode(',', $tagsString) as $tag) {
            $tags[] = Tag::findOrCreate(['name' => $tag]);
        }

        // Search / Create persons
        $persons = [];
        foreach (explode(',', $personsString) as $person) {
            $persons[] = Person::findOrCreate(['name' => $person]);
        }

        // Create a new memory
        $memory = new Memory([
            'text' => $text
        ]);
        $memory->save();

        // Attach tags
        foreach ($tags as $tag) {
            $junction = Relation::table('memories')->with('tags')->getJunction();
            $join = Lazer::table($junction);
            $join->memories_id = $memory->id;
            $join->tags_id = $tag->id;
            $join->save();
        }

        // Attach persons
        foreach ($persons as $person) {
            $junction = Relation::table('memories')->with('persons')->getJunction();
            $join = Lazer::table($junction);
            $join->memories_id = $memory->id;
            $join->persons_id = $person->id;
            $join->save();
        }

        $output->writeln('<info>Memory stored!</info>');
    }

    private function getOptionOrAsk(InputInterface $input, OutputInterface $output, $option, $question)
    {
        $helper = $this->getHelper('question');
        
        if (! $value = $input->getOption($option)) {
            $question = new Question($question);
            $value = $helper->ask($input, $output, $question);
        }

        return $value;
    }
}
