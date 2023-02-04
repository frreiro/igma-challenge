# 👀 CPF Validate Expression

Valid CPF must have verified digits that follows some rules, learn more about in [here](https://www.macoratti.net/alg_cpf.htm#:~:text=O).

To validate CPF, it used the class `CPF` available [here](src/validators/cpf/cpf.validator.ts). 
The CPF validation is based on the following code steps:

## Preparation

	- checkAndTransform()
  
The first step is check and converting the type of the CPF passed to the method. The following types are available to receive as arguments

	- string -> 'XXXXXXXXXDD'
	- string -> 'XXX.XXX.XXX-DD'
	- number ->  12345678910

Then it will convert some of these three types into a string in format 
	
	- 'XXXXXXXXXDD'


## Calculation

	- isValid()
  
These method alocates every inner step need to validate the cpf digits and validate if the digits found are the same as the digits passed

The following methods are used to calculate the the digits

	- initDigitCalculum() -> It's passed the cpf number without digits as argument and return the two digits determined by the algorithm 
	- calculateDigit() -> multiply each number by ascending numbers and return the sum of the result
	- calculateMultiplication() ->  multiply each number and return the result
	- calculateMultiplicationSum() -> sum the multiplied numbers and return the result
	- calculateDigitBySum() -> verify the logic and return one digit

