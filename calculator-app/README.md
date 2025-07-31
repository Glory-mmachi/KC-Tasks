===Node.js CLI Calculator===
A simple command-line calculator built with Node.js.

Key Features
-Perform: Add, Subtract, Multiply, Divide
-Handles decimals & invalid inputs
-Graceful error messages & retry options

How to Run
-Install Node.js

Running the Calculator (TypeScript Version)
Development
Run the app in development mode using tsx or ts-node:
-npm run dev

Production
-npm run build

Run the compiled JavaScript:
-npm start

Required Scripts in package.json
"scripts": {
"dev": "tsx src/calculator.ts",
"build": "tsc",
"start": "node dist/calculator.js"
}

Setup Notes
Make sure you have the required dev dependencies installed:

-npm install typescript tsx --save-dev
-npx tsc --init

Example

What operation do you want to perform: 1
Please input in this format: 3.5+2
Ans: 5.5

Test With
-Positive & negative numbers
-Decimals
-Division by zero
-Invalid formats (abc, 4,,5)
