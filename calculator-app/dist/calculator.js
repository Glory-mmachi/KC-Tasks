var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var OperationChoice;
(function (OperationChoice) {
    OperationChoice[(OperationChoice["ADD"] = 1)] = "ADD";
    OperationChoice[(OperationChoice["SUBTRACT"] = 2)] = "SUBTRACT";
    OperationChoice[(OperationChoice["MULTIPLY"] = 3)] = "MULTIPLY";
    OperationChoice[(OperationChoice["DIVIDE"] = 4)] = "DIVIDE";
    OperationChoice[(OperationChoice["EXIT"] = 5)] = "EXIT";
})(OperationChoice || (OperationChoice = {}));
const mainOperation = {
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
function welcome() {
    console.log(`👋 Welcome to Node.js Calculator!`);
}
function showAvailableOperations() {
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
function isValidNumber(value, symbol) {
    if (isNaN(Number(value[0])) || isNaN(Number(value[1]))) {
        return `❗Please input a valid number eg: 9 ${symbol} 7`;
    } else {
        return true;
    }
}
function handleInvalidInput(input, delimiter, symbol) {
    if (input.length === 0)
        return `❗Input cannot be empty! Use something like 5${symbol}2 or 3.4${symbol}5.1`;
    if (delimiter !== symbol) {
        return `❗Invalid format. Use something like 5${symbol}2 or 3.4${symbol}5.1`;
    }
    return null;
}
function validateInput(specificOperation, input, answer) {
    var _a;
    const trimmed = input.trim();
    const delimiter =
        (_a = trimmed.slice(1).match(/[+\-*/]/)) === null || _a === void 0
            ? void 0
            : _a[0];
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
    let numMain = main.map(Number);
    const nummm = Number(answer);
    const val = mainOperation[nummm];
    if (!val) {
        return `❗Unknown operation!`;
    }
    console.log(val.operation(numMain[0], numMain[1]));
    return null;
}
function askToContinue() {
    try {
        rl.question(
            "Do you want to perform another operation? YES/NO ",
            (answer) => {
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
    } catch (error) {
        console.error(`❌ Unknown operation: ${error.message}`);
    }
}
function exitGracefully() {
    rl.close();
}
function promptForOperation() {
    return new Promise((resolve) => {
        rl.question("What operation do you want to perform: ", (answer) => {
            const trimmedAnswer = answer.trim();
            const nummm = Number(trimmedAnswer);
            const specificOperation = mainOperation[nummm];
            if (!specificOperation) {
                console.error(`❌ Invalid number, please choose from 1-5\n`);
                return execute();
            }
            if (specificOperation.name.toLowerCase() === "exit") {
                console.log(`👋👋 Exiting Application...`);
                specificOperation.operation();
                return;
            }
            resolve(trimmedAnswer);
        });
    });
}
function getNumberInput(prompt) {
    return new Promise((resolve) => {
        const nummm = Number(prompt);
        const specificOperation = mainOperation[nummm];
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
function execute() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const promptOp = yield promptForOperation();
            const getNum = yield getNumberInput(promptOp);
            console.log(getNum);
        } catch (error) {
            if (error instanceof Error) {
                console.error("❌💣", error.message);
            } else {
                console.error("❌💣 Unexpected error", error);
            }
            exitGracefully();
        }
    });
}
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return b === 0 ? 1 : a / b;
}
