#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A Javascript Millionaire?'
    );

    await sleep();
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}.
    So get all questions right...
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        }
    })

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Javascript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17th, 1995'
        ]
    });
    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What is x?\n var x = 1_1 + "1" + Number(1)\n',
        choices: ['4', '"4"', '"1111"', '69420']
    });
    return handleAnswer(answers.question_2 === '"1111"')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    // if the answer is correct, move on
    // to the next question,
    // otherwise it'll kill the process
    if(isCorrect) {
        spinner.success({ text: `Nice Work ${playerName}!`})
    } else {
        spinner.error({text: `Game Over, Loser`})
        process.exit(1)
    }
}

function winner() {
    console.clear();
    console.log(chalk.bgBlue(`You Won, ${playerName}!`))
    process.exit(0)
}









console.clear()
await welcome()
await askName()
await question1()
await question2()
winner()