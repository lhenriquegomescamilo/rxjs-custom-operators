[![Test Integration](https://github.com/lhenriquegomescamilo/rxjs-custom-operators/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/lhenriquegomescamilo/rxjs-custom-operators/actions/workflows/npm-publish.yml)
[![NPM](https://nodei.co/npm/rxjs-custom-operators.png)](https://npmjs.org/package/rxjs-custom-operators)
[![SonarCloud](https://github.com/lhenriquegomescamilo/rxjs-custom-operators/actions/workflows/build.yml/badge.svg)](https://github.com/lhenriquegomescamilo/rxjs-custom-operators/actions/workflows/build.yml)
# Description

This project is inspired by library as [RamdaJS](https://ramdajs.com) and try to help developers to be more expressive
on handling events with these operators.

# How to use it

## Requirements

* These operators are designated to project that use [RxJs 6+](https://rxjs.dev/)

## filters

### filterNotNull

* This operator will filter values that are not null

```ts
    of(null, { color: 'red' })
    .pipe(filterNotNull())
    .subscribe(value => console.log(value));
```

* The result will be: `{ color: red } `

### filterNull

* This operator will filter only values are null

```ts
    of(null, { color: 'red' })
    .pipe(filterNull())
    .subscribe(value => console.log(value));
```

* The output will be: `null`

### filterPropNotNull

* Filter by property that are not null

```ts
of({ color: null }, { color: 'red' })
    .pipe(filterPropNotNull('color'))
    .subscribe(value => console.log(value));
```

* The output will be: `{ color: 'red' }`

## map

### mapIfFalse

* Map if the predicate are false

```ts
of({ color: null }, { color: 'red' }).pipe(
    mapIfFalse(
        ({ color }) => color !== null, // predicate 
        ({ color }) => color // ifFalse
    )
)
.subscribe(value => console.log(value));
```

* The output will be: `red`

### mapIfTrue

* Map if the predicate are true

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    mapIfTrue(
        ({ color }) => color === 'red', // predicate 
        ({ color }) => color // ifTrue
    )
)
.subscribe(value => console.log(value));
```

* The output will be: `red`

### mapIfOrElse

* Using this operator you can use if/else in the map, for example:

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    mapIfOrElse(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => color, // ifTrue
        ({ color }) => color.length // orElse
    )
)
.subscribe(value => console.log(value));
```

* The output will be: `"yellow" and then will be print "6" `

## switchMap

### switchMapIfFalse

* Could be usefully if your predicate are false on switch observables

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    switchMapIfFalse(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => of(color) // ifFalse -> Observable('red')
    )
)
.subscribe(value => console.log(value));
```

* The output will be: `"red"`

### switchMapIfTrue

* Could be usefully if your predicate are true on switch observables

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    switchMapIfTrue(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => of(color) // ifTrue -> Observable('yellow')
    )
)
.subscribe(value => console.log(value));
```

* The output will be: `"yellow"`

### switchMapIfOrElse

* Could be usefully when you need that two action bases on same predicate,similar of if/else, but for this case, in the
  Observable context, example:

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    switchMapIfOrElse(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => of(color), // ifTrue -> Observable("yellow")
        ({ color }) => of(color.length) // orElse -> Observable(6)
    )
)
.subscribe(value => console.log(value));
```

* The output will be: `"yellow" and then will be print "3" `

## tap

### tapIfFalse

* Will be tap when the predicate are false

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    tapIfFalse(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => console.log(color), // ifFalse -> ("red")
    )
)
.subscribe();
```

* The output will be: `"red"`

### tapIfTrue

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    tapIfTrue(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => console.log(color), // ifTrue
    )
)
.subscribe();
```

* First output: `"yellow"`

### tapIfOrElse

* Could be usefully when you need that two action bases on the same predicate,similar of if/else, but for this case, in
  the Observable context, example:

```ts
of({ color: 'yellow' }, { color: 'red' }).pipe(
    tapIfOrElse(
        ({ color }) => color === 'yellow', // predicate
        ({ color }) => console.log(color), // ifTrue 
        ({ color }) => console.log(color.length) // orElse
    )
)
.subscribe();
```

* First output: `"yellow"`
* Second output: `"3"` because the length of red is 3. 


 
