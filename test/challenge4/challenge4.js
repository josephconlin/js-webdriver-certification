/*
 * Challenge 4 - Operators and Functions:
 * For this challenge, we are going to write a class that display the fibonacci sequence up to a certain number.  If I
 * want the fibonacci for the 9 order of the sequence, I should see 21.
 *
 * However, to add additional challenge to this challenge, instead of displaying the number 21, I want the string
 * representation of twenty one.  This will require you to use string concatenation to print out the string.
 */

describe("challenge4 suite", async function(){
    // this.timeout(20000);
    it("Fibonacci sequence test", async function(order = 9) {
        console.log("Showing the Fibonacci numbers from order 1 to "+order);
        for(let i=1; i <= order; i++) {
            let fibonacci = await calculateFibonacci(i);
            console.log(fibonacci+" - "+await convertNumberToWords(fibonacci));
        }
    });

});

/*
 * Given the requirement:
 * 
 *  "For this challenge, we are going to write a function that displays the fibonacci sequence up to a certain number.
 *  If I want the fibonacci for the 9 order of the sequence, I should see 21."
 * 
 * the order -> sequence goes as follows.
 * 1 -> 0
 * 2 -> 1
 * 3 -> 1
 * 4 -> 2
 * 5 -> 3
 * 6 -> 5
 * 7 -> 8
 * 8 -> 13
 * 9 -> 21
 *  ...
 */
function calculateFibonacci(order) {
    return new Promise((resolve) => {
        let result = 0;
        let next = 1;

        //Return 0 for order 1 (or less to handle invalid input)
        for(let i=2; i<=order; i++) {
            result = result + next;
            next = result - next;
        }
        resolve(result);
    });
}

/* Functions for converting numbers to words */
//Array of names for orders of magnitude
const magnitudeNames = [
    "",
    " thousand",
    " million",
    " billion",
    " trillion",
    " quadrillion",
    " quintillion"
];

//Array of names for tens
const tensNames = [
    "",
    " ten",
    " twenty",
    " thirty",
    " forty",
    " fifty",
    " sixty",
    " seventy",
    " eighty",
    " ninety"
];

//Array of number names from one to nineteen, zero handled separately since it usually becomes part of tens names
const numberNames = [
    "",
    " one",
    " two",
    " three",
    " four",
    " five",
    " six",
    " seven",
    " eight",
    " nine",
    " ten",
    " eleven",
    " twelve",
    " thirteen",
    " fourteen",
    " fifteen",
    " sixteen",
    " seventeen",
    " eighteen",
    " nineteen"
];

//Numbers < 1000 use different logic than numbers >= 1000. Calculate words from right to left (ones to tens to hundreds)
function convertNumberLessThanOneThousandToWords(number) {
    return new Promise((resolve) => {
        let current;

        //Check for the last two digits of the number being less than 20
        if (number % 100 < 20){
            //Use last two digits of number as the index into numberNames
            current = numberNames[number % 100];
            //Remove last two digits from number before further processing
            number = Math.trunc(number /= 100);
        }
        //Last two digits of the number represent 20 or more
        else {
            //Use last digit of number as the index into numberNames
            current = numberNames[number % 10];
            //Remove last digit from number before further processing
            number = Math.trunc(number /= 10);

            //Use new last digit of number as the index into tensNames and put that in front of current words
            current = tensNames[number % 10] + current;
            //Remove new last digit of number before further processing
            number = Math.trunc(number /= 10);
        }

        //If new last digit of number is 0, return the current words
        if (number === 0) resolve(current);
        //Otherwise, use new last digit of number as the index into numberNames and add " hundred" and then current words
        let result = numberNames[number] + " hundred" + current;
        resolve(result);
    });
}

//Calculate words from right to left (hundreds to thousands to millions, etc)
function convertNumberToWords(number) {
    return new Promise(async (resolve) => {
        //Handle number being 0
        if (number === 0) resolve("zero");

        let prefix = "";

        //Check for negative number, if found, set prefix of "negative" and change number to positive so indexing into
        //arrays will work
        if (number < 0) {
            number = -number;
            prefix = "negative";
        }

        let current = "";
        //place indicates which order of magnitude is currently being converted to words
        let place = 0;

        while(number > 0) {
            //n is the rightmost 3 digits of the number
            let n = number % 1000;

            //Check if rightmost 3 digits of number equal 0, if true, nothing needs to be done for them
            if (n != 0){
                //Digits are not zero, get the "less than one thousand" words for them
                let s = await convertNumberLessThanOneThousandToWords(n);
                //Use place as the index into magnitudeNames and put that in front of the "less than one thousand" words
                current = s + magnitudeNames[place] + current;
            }

            //Prepare to work on the next order of magnitude
            place++;
            //Remove the rightmost three digits so next iteration of the loop can work on the next three digit group
            number = Math.trunc(number /= 1000);
        }

        resolve((prefix + current).trim());
    });
}
