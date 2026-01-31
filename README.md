# Playwright-Test-Automation
This repository contains an automated testing framework developed using Playwright with TypeScript. It is designed to test the functionality of a Singlish to Sinhala Translator web application. 

This project contains automated test cases for the Singlish to Sinhala translator available at https://www.swifttranslator.com/

---
## Tools And Technologies

- Playwright - End-to-end testing framework
- TypeScript - Programming language
- Node.js - Runtime environment


##  Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (Version 16 or above)
- npm (Node Package Manager)
- Git
- Visual Studio Code (Recommended)

Download Node.js from: https://nodejs.org


---

## Installation Steps

Follow these steps to set up the project on your local machine.

#### 1. Clone the Repository

Open Command Prompt and run:

```bash
git clone https://github.com/dishani02/Playwright-Test-Automation.git
```
#### 2. Navigate to the Project Folder

```bash
cd Playwright-Test-Automation
```

#### 3. Install Dependencies
```bash
npm install
```


#### 4. Install Playwright Browsers
```bash
npx playwright install
```
This will download required browser files.


#### 5. Running the Tests

Run All Tests
```bash
npx playwright test
```
#### 6. Run Tests in Headed Mode (With Browser UI)
```bash
npx playwright test --headed
```
#### 7. View Test Report

After running tests, generate and open the report
```bash
npx playwright show-report
```



##  Test Suite Overview

The test suite for the **Singlish to Sinhala Translator** includes a comprehensive set of automated tests covering functional, negative, and UI scenarios.

### 1. Positive Functional Test Cases

30 test cases (`Pos_Fun_0001` to `Pos_Fun_0030`)  

The positive functional tests validate:

- Sentence types: simple, compound, and complex sentences  
- Question and command forms: interrogative and imperative forms  
- Polarity: positive and negative forms  
- Common expressions: greetings, requests, and responses  
- Tense variations: past, present, and future  
- Mixed language content (Singlish + English)  
- Formatting: punctuation, currency, dates, and time formats  
- Input length variations: short, medium, and long  
- Grammatical variations: singular/plural and pronoun forms  
- Everyday expressions: day-to-day conversational usage  

---

### 2. Negative Functional Test Cases

11 test cases (Neg_Fun_0001 to Neg_Fun_0011)  

These tests handle invalid or unexpected inputs, including:

- Joined words without spaces  
- Extremely long unstructured inputs  
- Mixed case issues  
- Special characters  
- Multiple spaces and line breaks  
- Empty input handling  
- Slang and informal language edge cases  

---

### 3. UI Test Cases

**Total:** 2 test cases (Pos_UI_0001, Neg_UI_0001)  

The UI tests validate:
- Real-time output update behavior  
- Clear input functionality  

---

Test results are generated in the following locations:

- HTML Report: `playwright-report/index.html`
- Test Results: `test-results/`


## Configuration
Test configuration is defined in playwright.config.js. The default configuration:
- Runs tests in parallel
- Tests on Chromium, Firefox, and WebKit browsers
- Generates HTML reports
- Includes trace on first retry

## Notes
- Tests wait for real-time conversion (the application updates automatically)
- All tests include proper wait times for asynchronous updates
- Test cases follow the naming convention: Pos_Fun_XXXX, Neg_Fun_XXXX, Pos_UI_XXXX


## Troubleshooting
If tests fail:
Ensure you have a stable internet connection
- Check if the website https://www.swifttranslator.com/ is accessible
- Verify that all dependencies are installed: npm install
- Make sure Playwright browsers are installed: npx playwright install


Git Repository
The Git repository link should be provided in a separate text file as per assignment requirements.

