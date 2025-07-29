const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const FULL_NAME = "shubham_singh";  
const DOB = "21072004";       
const EMAIL = "shubham1384.be22@chitkarauniversity.edu.in";  
const ROLL_NUMBER = "2211981384"; 

const alternatingLetter = (str) => {
    let result = "";
    let upper = true;
    for (let ch of str) {
        result += upper ? ch.toUpperCase() : ch.toLowerCase();
        upper = !upper;
    }
    return result;
};


app.post('/bfhl', (req, res) => {
    console.log(req.body);
    try {
        const data = req.body.data;
        let evenNumbers = [], oddNumbers = [], alphabets = [], specialChars = [];
        let sum = 0;

        data.forEach(item => {
            if (/^-?\d+$/.test(item)) {  
                let num = parseInt(item);
                if (num % 2 === 0) evenNumbers.push(item);
                else oddNumbers.push(item);
                sum += num;
            }
            else {
                let isAlphabet = true;
                for (let i = 0; i < item.length; i++) {
                    let code = item.charCodeAt(i);
                    if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
                        isAlphabet = false;
                        break;
                    }
                }
                if (isAlphabet) {
                    alphabets.push(item.toUpperCase());
                } else {
                    specialChars.push(item);
                }
            }
        });

        
        let concatStr = alphabets.join('');
        concatStr = concatStr.split('').reverse().join('');
        concatStr = alternatingLetter(concatStr);

        // console.log(concatStr)

        const response = {
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialChars,
            sum: sum.toString(),
            concat_string: concatStr
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
    }
});



app.listen(PORT, (error) => {
    if (error) {
        console.log("error in server ", error);
    }
    else {
        console.log("Server is running on ", PORT);
    }
})