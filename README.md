This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all the packages:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

```bash
npm run test
# or
yarn test
```

Using the command will run the tests and show the number of tests that were passed/failed.
The test files can be found with their own respective components/file and with the `.test.tsx` extension

## Usage

Upon running the application it will fetch and load the logger data from the API.

The input fields at top can be used to filter the data, the rows can be sorted by clicking the row headers. After selecting desired inputs, filters can be applied using `Search Logger` button.

Clicking the `Reset Filters` button will reset all filters to default values.

The table can be traversed through using the pagination at the bottom of page.
