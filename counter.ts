type transformFnType = (count: number) => number
interface Counter {
  increment(): number
  decrement(): number
  getValue(): number
  reset(): number
  transform(transformFn: transformFnType): number
  createPredicate: () => (threshold: number) => boolean
  add(value: number): Counter
  subtract(value: number): Counter
  multiply(value: number): Counter
  snapshot(value: number): Counter
  batch(operations: { increments: number; decrements: number }): Counter
  toString(): string
}
interface Config {
  initialValue: number
  step: number
  min: number
  max: number
}
console.log("testt")

const CounterPrototype = {
  increment() {
    throw new Error("Not implemented")
  },
  decrement: () => {
    throw new Error("Not implemented")
  },
  getValue: () => {
    throw new Error("Not implemented")
  },
  reset: () => {
    throw new Error("Not implemented")
  },
}

function createCounter(initialValue: number = 0): Counter {
  let count = initialValue
  const counter = Object.create(CounterPrototype)

  counter.increment = () => {
    count++
    return count
  }
  counter.decrement = () => {
    count--
    return count
  }
  counter.getValue = () => count
  counter.reset = () => {
    count = initialValue
    return count
  }
  counter.transform = (transformFn: transformFnType) => {
    const result = transformFn(count)
    count = result
    return count
  }

  counter.createPredicate = () => (threshold: number) =>
    count >= threshold ? true : false

  // counter.onChange = (callback) => {}; //Do not fully understand this

  counter.add = (value: number) => {
    return createCounter(count + value)
  }
  counter.subtract = (value: number) => {
    return createCounter(count - value)
  }
  counter.multiply = (value: number) => {
    return createCounter(count * value)
  }
  counter.snapshot = () => {
    return createCounter(count)
  }
  counter.batch = (operations: { increments: number; decrements: number }) => {
    const { increments, decrements } = operations
    return createCounter(count + increments - decrements)
  }
  counter.toString = () => `count:${count}`

  return counter
}

const counter1 = createCounter(3)

const counter2 = createCounter(10)
console.log("hi", counter1.getValue())
console.log(counter2.getValue())

function createAdvancedCounter(config: Config) {
  const { initialValue = 0, step = 1, min = -Infinity, max = Infinity } = config
  let count = Math.max(min, Math.min(max, initialValue))

  return {
    increment() {
      const value = count + step
      if (value <= max) {
        count = value
        return count
      }
    },
    decrement() {
      const value = count - step
      if (value >= min) count = value
      return value
    },
    getValue() {
      return count
    },
    reset() {
      count = Math.max(min, Math.min(max, initialValue))
      return count
    },
    getConfig() {
      return config
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const conf1 = createAdvancedCounter({
  initialValue: 16,
  step: 5,
  min: 1,
  max: 9,
})

function SumCounter(ArrConters: Counter[]) {
  return ArrConters.reduce((sum, i) => sum + i.getValue(), 0)
}
console.log(SumCounter([counter1, counter2]))
