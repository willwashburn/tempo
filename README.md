# Tempo.fit

See [their website](https://tempo.fit/) for more information on what the Tempo even is but the TL;DR is 
>Tempo is the only smart home gym that makes weight training personalized and safe through real-time form corrections and custom workout plans.

This package provides a TypeScript SDK to the (very unofficial) API their mobile app uses. 

## Installation
```
npm i tempo-fit-api
```

You will want to copy the .env.example and add your tempo username and tempo password to run the tests.

## Usage
You must create an instance of `Tempo` in order to use it.

```
import { Tempo } from 'tempo-fit-api';

const tempo = new Tempo();
tempo.login({email:'your@email.com',password:'hunter1'});
```

See tempo.test.ts for a full example of the current usage.
