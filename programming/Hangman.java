/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Project;

/**
 *
 * @author Nathan
 */
import java.io.IOException;
import java.io.File;
import java.util.Scanner;
import java.util.Random;
import java.util.Arrays;

public class Hangman {

    public static void main(String[] args) throws IOException {
        String file = "WorldCities2024_v4.txt";
        File fileInput = new File(file);
        Scanner input = new Scanner(fileInput);
        Scanner keyboard = new Scanner(System.in);
        Random rand = new Random();
        int guesses;
        int i;
        int length = 0;
        while (input.hasNext()) { //here i am checking the length of the lines of the file document
            length++;
            input.nextLine();
        }

        //making all the arrays with the length i got up
        input = new Scanner(fileInput);
        String[] cities = new String[length];
        String[] countries = new String[length];
        int[] population = new int[length];

        //im looping through the file and adding the respective information to their arrays.
        for (i = 0; i < length; i++) {
            cities[i] = input.next();
            countries[i] = input.next();
            population[i] = input.nextInt();
        }
        //rules
        System.out.println("Welcome to the hangman game.\n");
        System.out.println("In this game you have to pick a country and guess a city in it.");
        System.out.println("You have the option to play with a hint or no hint.");
        System.out.println("A hint gives you only 3 guesses but you have access to the population.");
        System.out.println("No hints give you 6 guesses.\n");
        System.out.println("Good luck.\n");

        //menu
        int menuChoice;
        boolean exit = false;
        while (exit == false) {
            
            System.out.println("******** Menu ********");
            System.out.println("1. Pick a country");
            System.out.println("2. Exit");
            System.out.println("**********************");
            System.out.print("Choice: ");
            menuChoice = keyboard.nextInt();
            keyboard.nextLine();
            //validation
            while (menuChoice != 1 && menuChoice != 2) {
                System.out.println("Please enter a valid choice!");
                System.out.println("********Menu********");
                System.out.println("1. Pick a country");
                System.out.println("2. Exit");
                System.out.println("**********************");
                System.out.print("Choice: ");
                menuChoice = keyboard.nextInt();
                keyboard.nextLine();
            }
            if (menuChoice == 1) {
                //user input
                String country;
                System.out.print("Enter a country: ");
                country = keyboard.nextLine();
                boolean validation = false;
                while (validation == false) {
                    for (i = 0; i < countries.length; i++) { //i loop through all the countries
                        if (countries[i].equalsIgnoreCase(country)) { //if any country is equal to the country inputted by the user make the validation true
                            validation = true;
                        }
                    }
                    if (validation == false) { //if its false print a message and ask for the other input
                        System.out.print("Country not in file, please input another country: ");
                        country = keyboard.nextLine();
                    }
                }

                //then i count how many times the country appears in the file
                int count = 0;
                for (i = 0; i < countries.length; i++) {
                    if (countries[i].equalsIgnoreCase(country)) {
                        count++;
                    }
                }

                //then i make a new array randomCity that has the count as array length
                String[] randomCity = new String[count];
                int[] randomCityPopulation = new int[count]; //also made an array to store all the population of the selected country 

                int index = 0; //made an index variable so that i easily loop through the randomCity and randomCityPopulation array
                for (i = 0; i < countries.length; i++) {
                    if (countries[i].equalsIgnoreCase(country)) { //checks if the country matches the country inputted by the user
                        randomCity[index] = cities[i]; //if yes then it puts the city that matches the index of the country
                        randomCityPopulation[index] = population[i]; //does the same for the population
                        index++; //index increments by 1 for the 2 arrays
                    }
                }

                int randomCityIndex = rand.nextInt(randomCity.length);
                String city = randomCity[randomCityIndex];//chose a random city among the cities
                city = city.toLowerCase(); //change all the characters in the city to lowercase to make it easier to work with lol.

                System.out.println("Do you want a hint yes or no ?: ");
                String hint;
                //validation
                hint = keyboard.nextLine();
                while (!hint.equalsIgnoreCase("yes") && !hint.equalsIgnoreCase("no")) {
                    System.out.println("Please input a valid choice. (yes or no)");
                    hint = keyboard.nextLine();
                }
                String[] cityArray = new String[city.length()]; //i make a new array with the chosen city and give it all values of _, _, _, _ for example
                //i did that so i could display the information to the user about where the location of the word is.
                for (i = 0; i < cityArray.length; i++) {
                    cityArray[i] = "_";
                }

                //******************* MAIN GAME *************************
                //in the main game if the user gets to use a hint he gets only 3 guesses, each correct guess does not decrement the amount of guesses.
                //if the user gets no hint then he gets 6 guesses.
                boolean game = true;
                if (hint.equals("yes")) {
                    guesses = 3;
                    System.out.print("The city has a population of: "); //display the population as a hint.
                    System.out.println(randomCityPopulation[randomCityIndex] + " people."); //print out the population of the chosen city
                } else {
                    guesses = 6;
                }

                System.out.print("Enter a letter to guess the city: ");
                String guess = keyboard.nextLine();
                guess = guess.toLowerCase();

                //entire game
                while (game == true && guesses > 0) {
                    if (guess.length() == 1) { //if the guess is a single character
                        if (city.indexOf(guess) != -1) { //if the guess is still more than 0 and the guess is inside the list  
                            boolean alreadyGuessed = false; //boolean statement to check if a letter has already been gussed
                            for (i=0;i<cityArray.length;i++){ //i loop through the array that stores each character of the list
                                if (cityArray[i].equals(guess)){ //if the letter matches a character the boolean is set to true
                                    alreadyGuessed = true; 
                                }
                            }
                            for (i = 0; i < city.length(); i++) { //loops inside the city
                                if (city.charAt(i) == guess.charAt(0)) { //checks if there are more of the same guess duplicated
                                    cityArray[i] = guess; //put them in the array at their position to display
                                }
                            }
                            if (alreadyGuessed == true){ //prints a message if the boolean is set to true
                                System.out.println("You already guessed this letter !");
                            }
                            else {
                                System.out.println("The character " + guess + " is a character in the city.");
                            }
                            System.out.println(Arrays.toString(cityArray)); //prints the content of the list that contains the guessed letters
                            System.out.println("You have " + guesses + " guess(es) left.");
                            System.out.print("Enter a guess: ");
                            guess = keyboard.nextLine();
                            guess = guess.toLowerCase();
                        } 
                        
                        else { //if there isnt any character then it decrements a guess and prints out the information
                            guesses--;
                            System.out.println("The city does not contain that letter !");
                            if (guesses > 0) { //added an if statement to make sure the program does not allow me to input once my guess number reaches 0 
                                System.out.println("You have " + guesses + " guess(es) left.");
                                System.out.print("Enter a guess: ");
                                guess = keyboard.nextLine();
                                guess = guess.toLowerCase();
                            } else {
                                System.out.println("You ran out of guesses...");
                            }

                        }
                    } else { //if the guess is more than 1 character then the user most likely attempted to answer with a city
                        if (city.equals(guess)) { //if he gets it right then game = false so the program is stopped.
                            System.out.println("Congratulations ! You got the city right !");
                            game = false;
                        } 
                        else { //otherwise guess is decremented and back at the start of the loop.
                            guesses--;
                            if (guesses > 0) { //same if statement here to prevent the program from letting me input if my guesses reach 0
                                System.out.println("Nice try guessing, but its WRONG.");
                                System.out.println("You have " + guesses + " guess(es) left.");
                                System.out.print("Enter a guess: ");
                                guess = keyboard.nextLine();
                                guess = guess.toLowerCase();
                            } else {
                                System.out.println("You ran out of guesses...");
                            }
                        }
                    }
                }
                if (guesses == 0 && game == true) { //added a statement that checks if guesses are 0, and game = true meaning the game ended because of insufficient guess
                    System.out.println("Game over");
                    System.out.println("The city was, " + city);
                }
            }
            else{
                exit = true;
                System.out.println("Goodbye !");
            }

        }
    }
}
