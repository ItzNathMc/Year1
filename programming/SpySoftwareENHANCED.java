/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Project;

/**
 *
 * @author Nathan
 */

//this is where it gets serious now..
import java.util.Scanner;
import java.util.Random;

public class SpySoftwareENHANCED {
    public static void main(String[] args){
        Scanner keyboard = new Scanner(System.in);
        Random rand = new Random();
        String str, text="";
        int i,y;
        int choice;
        final int ALPHABETCOUNT = 53; //26 x 2 because of capital letter + 1 because of the space so 53 in total.
        String pText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "; //alphabet
        String cText = ""; //empty string for now..
        String[] previouskey = new String[1];
        boolean end = false;
        while (end == false){
            System.out.println("***********MENU***********");
            System.out.println("1. Encrypt");
            System.out.println("2. Decrypt");
            System.out.println("3. Exit\n");
            System.out.print("Enter choice: ");
            choice = keyboard.nextInt();
            while (choice != 1 && choice != 2 && choice != 3){ //user validation
                System.out.println("Please enter a valid choice !");
                System.out.println("***********MENU***********");
                System.out.println("1. Encrypt");
                System.out.println("2. Decrypt");
                System.out.println("3. Exit\n");
                System.out.print("Enter choice: ");
                choice = keyboard.nextInt();
            } 
            keyboard.nextLine();
            if (choice == 3){ //exits the loop
                System.out.println("See you never !");
                end = true;
            }
            else{
                System.out.print("Enter the string: ");
                str = keyboard.nextLine();

                String shuffle = pText; //give the shuffle string the alphabet
                int length = str.length();
                if (choice == 1) {
                    // ----------- ENCRYPTION ------------------
                    while (shuffle.length() > 0) {
                        int num = rand.nextInt(shuffle.length()); //randomise an index integer
                        cText += shuffle.charAt(num); //then i add the character to the c text
                        shuffle = shuffle.substring(0, num) + shuffle.substring(num + 1); //i remove the character from the string
                    }
                    previouskey[0] = cText; //i make an array to store the "previous" key

                    
                    for (i = 0; i < length; i++) {
                        for (y = 0; y < ALPHABETCOUNT; y++) {
                            if (pText.charAt(y) == str.charAt(i)) {
                                text += cText.charAt(y);
                            }

                        }
                    }
                    String originalEncrypt = text;
                    //reversing by running the loop from the bottom to the start
                    String tempReverse = "";
                    for (i=text.length()-1;i>=0;i--){ 
                        tempReverse += text.charAt(i);
                    }
                    text=tempReverse;  
                    
                    //Here, i use a for loop to add all the even index elements into a temporary list
                    String tempSwap = "";
                    for (i=0;i<text.length();i=i+2){
                        tempSwap += text.charAt(i);
                    }
                    
                    
                    //I then loop again and then add the remaining odd index elements
                    for (i=1;i<text.length();i=i+2){
                        tempSwap += text.charAt(i);
                    }
                    text = tempSwap;
                    
                    //print out the output
                    System.out.println("TESTING PURPOSES CTEXT = "+cText);
                    System.out.println("**********OUTPUT****************");
                    System.out.println("Here is your original encrypted text: "+originalEncrypt+"\n");
                    System.out.println("Here is it in reverse: "+tempReverse+"\n");
                    System.out.println("Here is the encrypted text with index manipulation: \"" + text+"\"\n");
                } 
                
                // ----------------DECRYPTION-----------------------
                else {
                    //if there is nothing in the previous key array that means that there are no key used to decrypt.
                    if (previouskey[0] == null) {
                        System.out.println("No previous encryption !");
                    }
                    //otherwise
                    else {
                        for (i = 0; i < length; i++) {
                            for (y = 0; y < ALPHABETCOUNT; y++) {
                                if (previouskey[0].charAt(y) == str.charAt(i)) {
                                    text += pText.charAt(y);
                                }
                            }
                        }
                        String originalDecrypt = text;
                        //rebuilding the text after swapping the places during the encryption
                        int middle = (text.length()+1)/2; 
                        String firstPart = text.substring(0,middle);
                        String secondPart = text.substring(middle);
                        String tempSwapBack = "";
                        for (i=0;i<firstPart.length();i++){
                            tempSwapBack += firstPart.charAt(i);
                            if (i<secondPart.length()){
                                tempSwapBack += secondPart.charAt(i);
                            }
                        }   
                        text = tempSwapBack;
                        
                        
                        //reversing back the characters ie. elppA into Apple
                        String tempReverseback = "";
                        for (i = text.length() - 1; i >= 0; i--) { 
                            tempReverseback += text.charAt(i);
                        }
                        text = tempReverseback;
                        
                        //outputs
                        System.out.println("TESTING PURPOSES CTEXT = "+previouskey[0]);
                        System.out.println("**********OUTPUT****************");
                        System.out.println("Here is your original decrypted text: "+originalDecrypt+"\n");
                        System.out.println("Here is it with the reverse index manipulation: "+tempSwapBack+"\n");
                        System.out.println("Here is the encrypted text reversed back: \"" + text+"\"\n");
                    }
                }
                text = "";
                cText = "";
            }
        } 
    }
}
