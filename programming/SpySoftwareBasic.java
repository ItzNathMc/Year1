/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Project;

/**
 *
 * @author Nathan
 */
import java.util.Scanner;

public class SpySoftwareBasic{

    public static void main(String[] args) {
        Scanner keyboard = new Scanner(System.in);
        String str, text = "";
        int i, y;
        int choice;
        
        //really basic simple encryption here hai
        
        String pText = "abcdefghijklmnopqrstuvwxyz"; //alphabet
        String cText = "pvhkbznuifmjlwsradoyectgqx"; //randomized alphabet that we'll use to encrypt
        System.out.print("Type: (0 for encrypt, 1 for decrypt): ");
        choice = keyboard.nextInt();
        keyboard.nextLine();
        System.out.print("Enter the string: ");
        str = keyboard.nextLine();
        int length = str.length();
        if (choice == 0) { //if user chooses to encrypt then
            for (i = 0; i < length; i++) { //loops through the word
                if (str.charAt(i) == ' ') { //if it finds a space then it puts a space in the new encrypted word
                    text += " ";
                }
                for (y = 0; y < pText.length(); y++) { //loops through the alphabet
                    if (pText.charAt(y) == str.charAt(i)) { //if the character from the inputted string is equal to the a number in the alphabet 
                        text += cText.charAt(y); //it will then use the same index in the alphabet for the encrypted one 
                    }

                }
            }
            System.out.println("Here is your encrypted text: " + text);
        } 
        //for decrypting its basically the same thing but in reverse 
        else {
            for (i = 0; i < length; i++) { //puts a space if there is one 
                if (str.charAt(i) == ' ') {
                    text += " ";
                }
                for (y = 0; y < pText.length(); y++) {
                    if (cText.charAt(y) == str.charAt(i)) { //checks if the user inputted character is the same as the character in the encrypted text
                        text += pText.charAt(y); //use the index of that on the real alphabet to reverse the encryption
                    }
                }
            }
            System.out.println("Here is the decrypted text: " + text);
        }

    }
}


//this is the basic version of the program with no validation, no randomised encrypted key etc...