Task 2.2:
 we're creating a prototype first instead of putting methods directly in each counter instance because it prevents code repition and makes the code look even cleaner 

 Task 6:
 counter.increment() directly manipulates the original counter while counter.add(1) creates an instance of the original counter which you can.


 Reflection Questions
After completing the exercises, consider:

How do closures help maintain private state?
Ans:It helps each instance maintain its own provate state

What are the benefits of using prototypal inheritance here?
Ans:It allows different instances have access to its methods

When would you use mutable vs immutable methods?
Ans: I would use mutable methods when trying to manipulate the original insance while immutable methods when trying to create an instance of that method without manipulating the instance.

How do higher-order functions make the counter more flexible?
Ans: It allows different logic to be passed 

What ES6 features improved the readability of your code?
Ans: Arrow functions, template literals,Destructuring,Default parameters