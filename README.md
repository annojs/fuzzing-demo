# Node - Fuzzing Demo

This little demo shows how to fuzz functions using various experimental tools.

The basic idea is very simple. We simply annotate the functions we want to fuzz using type hints. In addition we define external invariants that must be true. By using this information we have enough data to generate tests that try to invalidate the invariant.

We cannot prove that our functions are correct but at least this way of testing can expose various corner cases standard unit testing simply cannot. Hence it complements unit testing and improves test coverage.

Annotating functions makes it possible to generate documentation so its usefulness goes beyond just fuzzing. And of course you get runtime errors in case you try to invoke a function in a way that is not valid.

There is some performance overhead. I have not measured it but I guess you should not use these sort of techniques for performance critical code. There are possibly ways to get the best of both worlds. Perhaps it would be possible to transform the code into a "production" form that uses traditional branching and skips creating additional functions and checks.
