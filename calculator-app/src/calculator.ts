/**
 * This application uses the command line interface to perform some arithimetic operations
 * It uses readline to interact with the command line
 */

import readline from "readline";

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface CalculatorOperation {
    name: string;
    symbol: string;
    operation: ((a: number, b: number) => number) | (() => void);
}

enum OperationChoice {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4,
    EXIT = 5,
}

const mainOperation: Record<OperationChoice, CalculatorOperation> = {
    [OperationChoice.ADD]: {
        name: "Addition",
        symbol: "+",
        operation: add,
    },
    [OperationChoice.SUBTRACT]: {
        name: "Subtraction",
        symbol: "-",
        operation: subtract,
    },
    [OperationChoice.MULTIPLY]: {
        name: "Multiplication",
        symbol: "*",
        operation: multiply,
    },
    [OperationChoice.DIVIDE]: {
        name: "Division",
        symbol: "/",
        operation: divide,
    },
    [OperationChoice.EXIT]: {
        name: "exit",
        symbol: "x",
        operation: exitGracefully,
    },
};

/**Logs a welcome message immediately the application starts */
function welcome(): void {
    console.log(`👋 Welcome to Node.js Calculator!`);
}

/**
 * Logs the availabe operations eg: add,subtact,multiply,divide and exit
 * */
function showAvailableOperations(): void {
    console.log(`  Select operation:`);
    console.log(`  1. Add`);
    console.log(`  2. Subtract`);
    console.log(`  3. Multiply`);
    console.log(`  4. Divide`);
    console.log(`  5. Exit`);
    console.log(`  Enter choice (1-5):\n`);
}

welcome();
showAvailableOperations();
execute();

/**
 * Validates whether both elements in the input string array can be converted to valid numbers.
 * If either element is not a number, returns an error message with an example using the given symbol.
 *
 * @param {string[]} value - An array containing two string values to be validated as numbers.
 * @param {string} symbol - The arithmetic symbol (e.g., '+', '-', '*', '/') used in the error example.
 * @returns {boolean | string} Returns `true` if both inputs are valid numbers;
 * otherwise returns a string error message prompting for valid numeric input.
 *
 * @example
 * isValidNumber(["4", "5"], "+"); // returns true
 * isValidNumber(["4", "a"], "+"); // returns "❗Please input a valid number eg: 9+7"
 */
function isValidNumber(value: string[], symbol: string): boolean | string {
    // Your existing implementation

    if (isNaN(Number(value[0])) || isNaN(Number(value[1]))) {
        return `❗Please input a valid number eg: 9 ${symbol} 7`;
    } else {
        return true;
    }
}
/**
 * Checks for common invalid input scenarios and returns a helpful error message if detected.
 *
 * @param {string} input - The user input string to validate.
 * @param {string | undefined} delimiter - The detected delimiter from the input (e.g., '+', '-', etc.).
 * @param {string} symbol - The expected arithmetic symbol for validation (used in the error message example).
 * @returns {string | null} Returns a string describing the specific validation error if found,
 * otherwise returns `null` if the input is considered valid.
 *
 * @example
 * handleInvalidInput("5+2", "+", "+"); // returns null
 * handleInvalidInput("", "+", "+"); // returns "❗Input cannot be empty! Use something like 5+2 or 3.4+5.1"
 * handleInvalidInput("5+2", "*", "+"); // returns "❗Invalid format. Use something like 5+2 or 3.4+5.1"
 */
function handleInvalidInput(
    input: string,
    delimiter: string | undefined,
    symbol: string,
): string | null {
    // Your existing implementation
    if (input.length === 0)
        return `❗Input cannot be empty! Use something like 5${symbol}2 or 3.4${symbol}5.1`;
    if (delimiter !== symbol) {
        return `❗Invalid format. Use something like 5${symbol}2 or 3.4${symbol}5.1`;
    }
    return null;
}
/**
 * Validates a user's arithmetic input based on the expected operation.
 *
 * This function trims the input, extracts the operator, checks for input validity,
 * parses the operands, and ensures that the specified operation is supported.
 * If everything checks out, it performs the operation (for internal testing) and returns `null`.
 * Otherwise, it returns a descriptive error message.
 *
 * @param {CalculatorOperation} specificOperation - The operation the user selected (includes the expected symbol).
 * @param {string} input - The raw input string from the user, e.g., "5+3".
 * @param {string} answer - The numeric key (as a string) corresponding to the operation to be performed.
 *
 * @returns {string | null} Returns an error message if the input is invalid; otherwise, returns `null`.
 *
 * @example
 * validateInput({ symbol: "+" }, "5+3", "1"); // returns null
 * validateInput({ symbol: "+" }, "", "1"); // returns error about empty input
 * validateInput({ symbol: "+" }, "5*3", "1"); // returns format error
 */
function validateInput(
    specificOperation: CalculatorOperation,
    input: string,
    answer: string,
): string | null {
    const trimmed = input.trim();
    const delimiter = trimmed.slice(1).match(/[+\-*/]/)?.[0];
    const main = delimiter ? trimmed.split(delimiter) : null;

    const inputError = handleInvalidInput(
        trimmed,
        delimiter,
        specificOperation.symbol,
    );
    if (inputError) return inputError;
    if (!main)
        return `❗Invalid input format.Use something like 5${specificOperation.symbol}2 or 3.4${specificOperation.symbol}5.1`;
    const isValid = isValidNumber(main, specificOperation.symbol);
    if (typeof isValid !== "boolean") return isValid;

    const numMain: number[] = main.map(Number);
    const nummm = Number(answer);
    const val = mainOperation[nummm as OperationChoice];
    if (!val) {
        return `❗Unknown operation!`;
    }
    console.log(val.operation(numMain[0], numMain[1]));
    return null;
}

/**
 * Prompts the user to confirm if they want to perform another operation.
 * - If the user responds with "YES", it restarts the operation flow.
 * - If the user responds with "NO", it exits the program gracefully.
 * - For any other input, it re-prompts the user.
 *
 * Handles unexpected errors gracefully by displaying an error message.
 */
function askToContinue(): void {
    try {
        rl.question(
            "Do you want to perform another operation? YES/NO ",
            (answer: string) => {
                if (answer.trim().toLowerCase() === "no") {
                    exitGracefully();
                } else if (answer.trim().toLowerCase() === "yes") {
                    showAvailableOperations();
                    execute();
                } else {
                    console.error(`❓ Please type YES or NO\n`);
                    askToContinue();
                }
            },
        );
    } catch (error: any) {
        console.error(`❌ Unknown operation: ${error.message}`);
    }
}
/**
 * Gracefully exits the program by closing the readline interface.
 *
 * This is typically called when the user decides not to perform
 * any more operations.
 */
function exitGracefully(): void {
    rl.close();
}
/**
 * Prompts the user to select an operation from a list of calculator options.
 *
 * Validates the user's input to ensure it corresponds to a known operation.
 * If the input is invalid, the function logs an error and restarts execution.
 * If the selected operation is "Exit", the application exits gracefully.
 *
 * @returns {Promise<string>} A promise that resolves with the trimmed user input
 * representing the selected operation number.
 */
function promptForOperation(): Promise<string> {
    return new Promise((resolve) => {
        rl.question(
            "What operation do you want to perform: ",
            (answer: string) => {
                const trimmedAnswer = answer.trim();
                const nummm = Number(trimmedAnswer);
                const specificOperation =
                    mainOperation[nummm as OperationChoice];

                if (!specificOperation) {
                    console.error(
                        `❌ Invalid number, please choose from 1-5\n`,
                    );
                    return execute();
                }

                if (specificOperation.name.toLowerCase() === "exit") {
                    console.log(`👋👋 Exiting Application...`);
                    (specificOperation.operation as () => void)();
                    return;
                }

                resolve(trimmedAnswer);
            },
        );
    });
}

/**
 * Prompts the user to enter two numbers using the symbol of the selected operation.
 *
 * The input should follow a specific format, such as "5+2" or "3*8", depending on the operation selected.
 * The function validates the input and displays an error message if the input is invalid.
 * If valid, it proceeds to ask the user whether they want to perform another operation.
 *
 * @param {string} prompt - The string representing the numeric value of the selected operation (e.g., "1" for addition).
 * @returns {Promise<string>} A promise that resolves with the user's valid input string.
 */
function getNumberInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        const nummm = Number(prompt);
        const specificOperation = mainOperation[nummm as OperationChoice];
        rl.question(
            `ℹ️ℹ Please input in this format:5${specificOperation.symbol}2 or 3${specificOperation.symbol}8 \n `,
            (input) => {
                const inputError = validateInput(
                    specificOperation,
                    input,
                    prompt,
                );

                if (inputError) {
                    console.error(inputError);
                    resolve(getNumberInput(prompt));
                    return;
                }
                askToContinue();
                resolve(input);
            },
        );
    });
}

/**
 * Executes the main flow of the CLI calculator application.
 *
 * This function:
 * - Prompts the user to select an operation.
 * - Asks for numerical input in the correct format.
 * - Logs the valid input or handles errors gracefully.
 *
 * If an error occurs during any step, it logs the error and exits the application cleanly.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when execution completes or fails.
 */
async function execute() {
    try {
        const promptOp = await promptForOperation();
        const getNum = await getNumberInput(promptOp);
        console.log(getNum);
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌💣", error.message);
        } else {
            console.error("❌💣 Unexpected error", error);
        }
        exitGracefully();
    }
}

/**
 * Adds two numbers and returns the result.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of `a` and `b`.
 *
 * @example
 * add(2, 3); // returns 5
 */
function add(a: number, b: number): number {
    // Implementation
    return a + b;
}
/**
 * Subtracts the second number from the first and returns the result.
 *
 * @param {number} a - The number to subtract from.
 * @param {number} b - The number to subtract.
 * @returns {number} The result of `a - b`.
 *
 * @example
 * subtract(10, 4); // returns 6
 */
function subtract(a: number, b: number): number {
    // Implementation
    return a - b;
}

/**
 * Multiplies two numbers and returns the result.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of `a` and `b`.
 *
 * @example
 * multiply(3, 4); // returns 12
 */
function multiply(a: number, b: number): number {
    // Implementation
    return a * b;
}

/**
 * Divides one number by another and returns the result.
 * Returns 1 if the divisor is 0 to prevent division by zero errors.
 *
 * @param {number} a - The numerator.
 * @param {number} b - The denominator.
 * @returns {number} The result of `a` divided by `b`, or 1 if `b` is 0.
 *
 * @example
 * divide(10, 2); // returns 5
 * divide(5, 0);  // returns 1
 */
function divide(a: number, b: number): number {
    // Implementation
    return b === 0 ? 1 : a / b;
}
