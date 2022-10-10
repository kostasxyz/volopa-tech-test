# Volopa Tech test
---
![Alt text](screenshots/volopa-img-001.png?raw=true "Screenshot 1")
---
![Alt text](screenshots/volopa-img-002.png?raw=true "Screenshot 2")
---
![Alt text](screenshots/volopa-img-003.png?raw=true "Screenshot 3")
---
## Frontend
### In the volopa-tech-test-app directory, run:
##### `npm i` to set up the project
##### `npm start` to start the development server

## Backend
### In the volopa-tech-test-api directory run
##### `composer update`
```
composer update
sail up -d
sail artisan breeze:install api
sail artisan migrate:fresh --seed
npm install
npm run dev
```
##### check .env.example for token settings
```
AUTH_TOKEN_EXP=1 - set auth token 
REFRESH_TOKEN_EXP=10
```

##### check .env.example for domain/cors settings (assuming csrf needed)
```
APP_URL=
FRONTEND_URL=
APP_PORT=5
SANCTUM_STATEFUL_DOMAINS=
```

### Auth token
The app uses token based authentication.
- Using sanctum, created an api auth system that sends a auth_token at login response and a refresh_token as a httpOnly cookie (not secure for dev) 
- Created a guard to check for bearer token validity and expiration
- An auth provider context to store and set the auth token and user.
- useCsrfToken hook to get the csrf token from the backend before making requests
- useRefreshToken hook
- useApi hook to setup axios intrerceptors
- useCurrencyRatesQuery hook with react-query to fetch rates from the api
- Token expires in one minute for dev env. `SANCTUM_AUTH_TOKEN_EXP=1`
- Refresh token expires in 20 minutes for dev env `SANCTUM_REFRESH_TOKEN_EXP=20`
- Authenticated and Guest route layouts to protect routes and do appropriate redirects.
- When user logs in a token is set in the auth provider and a refresh token is send in an httpOnly (non http for dev) cookie.
- User is able to query the api as long as the auth_token is not expired, in which case the axios interceptor will make a request to the `refresh` route to set a new auth and refresh token. 

### RateChecker
I have worked on this as much as I could afford timewise, still needs a lot of work and executive decisions.
Right now the converter is a custom solution converting "to" from "from". Convertion calculations are down client side, 
idea being to handle UI info quick and validation later when user confirms convertion by doing checks and calculations server side.
When the user enters a value in the "to" field the "from" changes to reflect the necesary amount.
Also when a user changes currencies the "to" amount stays constant while the "from" changes to adjust.
A greater improvement would be a lib like https://openexchangerates.github.io/money.js/ or dinero.js to handle convertions.
Decimal places are handled vary basic with toFixed, a lib for currency would be again a more elegant solution.
Had I had more time, I would use the refresh interval of the react-query query for rates 
to animate the circular counter (guessing a 1 minute countdown) at the down left corner of RateChecker.

Models for the backend are:

CurrencyRate
```
$table->id();
$table->string('base');
$table->string('target');
$table->string('group')->default('other');
$table->float('rate'); // Data type depending on needs. Float for this test.
$table->timestamps();
```

The base field is the currency that the target rate references, so 
a target currency EUR is 1.14~ rate with the GBP base.

At this stage we could avoid the `base` field and use a global base currency and we can handle the inverse convertions calculating through the base. (example further down)

A different solution thatn the one implementes would be to have a currency and and rates table with 2 foreign keys on the rates table to reference base and target currency and their respective rate.

I choose to have all in one table (base, target, rate) to avoid possibly unnecessary joins.

I think ideally a full list of all currency pairs and rates should be implemented.
example
```
'base' => 'GBP',
'target' => 'GBP',
'rate' => 1,

'base' => 'GBP',
'target' => 'EUR',
'rate' => 0.86,

'base' => 'EUR',
'target' => 'GBP',
'rate' => 1.14,
```

The way the converter works for example, converting to 10 GBP from ? EUR.
```
$to = [
    'base' => 'GBP',
    'target' => 'GBP',
    'rate' => 1,
];

$from = [
    'base' => 'GBP',
    'target' => 'EUR',
    'rate' => 0.87338,
];

(10 * $to['rate']) * (1 / $from['rate']);
```

And the inverse to ? GBP from 10 EUR
```
(10 * $from['rate']) * (1 / $to['rate']);
```

A user can have many wallets for each currency.

Wallet
```
$table->id();
$table->foreignId('user_id')
    ->constrained()
    ->onUpdate('cascade')
    ->onDelete('cascade');
$table->string('currency');
$table->integer('amount')->default(0);
$table->timestamps();
```
