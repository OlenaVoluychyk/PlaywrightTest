# Playwright + Jest + TypeScript

## Preconditions

1. To install the project run 
```
npm install
```

2. Add `.env` file with credentials to automation tests root directory

3. To execute all tests run 
```
npm run test:all-tests
```

4. To execute a Login test run in command
```
npm run test:login
```

4. To execute a Cart test run in command
```
npm run test:cart
```

## Allure reports 

How to get a report
You need to install the [CLI](https://github.com/allure-framework/allure2#download) in order to obtain a report.

To see a report in browser, run in console (allure-results folder will be created)
```
allure serve
```

If you want to generate html version, run in console (allure-reports folder will be created)
```
allure generate
````