# Portfolio Tracker

Portfolio Tracker is a Node.js application designed to track stock trades, calculate holdings, and returns. The application allows users to add, update, remove trades, and get their portfolio status and returns based on trading activities.

## Features

- Add, update, and remove trades.
- Calculate portfolio holdings (average buy price and total quantity).
- Calculate cumulative returns.
- RESTful API architecture.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)

## Project Structure

```
PORTFOLIO-TRACKER/
│
├── controllers/
│   └── portfolioController.js
├── models/
│   └── Trade.js
│   └── Counter.js
├── routes/
│   └── portfolioRoutes.js
├── server.js
├── package.json
└── README.md
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/portfolio-tracker.git
   cd portfolio-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB** (Ensure MongoDB is running locally or provide the connection string to a remote MongoDB instance in `server.js`).

4. **Run the application:**
   ```bash
   npm start
   ```

5. The application will be running at `http://localhost:3000`.

## API Endpoints

### 1. **Get Portfolio**
   - **URL**: `GET /portfolio/`
   - **Description**: Retrieves the entire portfolio of trades.
   - **Response Example**:
     ```json
     {
         "success": true,
         "data": [
             {
                 "_id": "66f7c0f0468077a6582695ba",
                 "stock": "TCS",
                 "quantity": 20,
                 "price": 1230,
                 "date": "2024-09-15T00:00:00.000Z",
                 "type": "buy",
                 "__v": 0
             },
             {
                 "_id": "66f7c1c9468077a6582695c3",
                 "stock": "Infosys",
                 "quantity": 50,
                 "price": 1223,
                 "date": "2024-09-15T00:00:00.000Z",
                 "type": "buy",
                 "__v": 0
             }
         ]
     }
     ```

### 2. **Get Holdings**
   - **URL**: `GET /portfolio/holdings`
   - **Description**: Get holdings with average buy price and total quantity.
   - **Response Example**:
     ```json
     {
         "success": true,
         "data": [
             {
                 "stock": "TCS",
                 "quantity": 20,
                 "avgBuyPrice": "1230.00"
             },
             {
                 "stock": "Infosys",
                 "quantity": 50,
                 "avgBuyPrice": "1223.00"
             }
         ]
     }
     ```

### 3. **Get Returns**
   - **URL**: `GET /portfolio/returns`
   - **Description**: Calculate the cumulative returns on the portfolio.
   - **Response Example**:
     ```json
     {
         "success": true,
         "data": {
             "initialValue": 214550,
             "currentValue": 22000,
             "returnValue": -89.74597995805173
         }
     }
     ```

### 4. **Add a Trade**
   - **URL**: `POST /portfolio/addTrade`
   - **Description**: Add a new trade to the portfolio.
   - **Request Body**:
     ```json
     {
         "stock": "ABC",
         "quantity": 100,
         "price": 1223,
         "date": "2024-09-15",
         "type": "buy"
     }
     ```
   - **Response Example**:
     ```json
     {
         "success": true,
         "data": {
             "stock": "ABC",
             "quantity": 100,
             "price": 1223,
             "date": "2024-09-15T00:00:00.000Z",
             "type": "buy",
             "_id": "66f7d404acbbbb9126cfbdf8",
             "tradeId": 3,
             "__v": 0
         }
     }
     ```

### 5. **Update a Trade**
   - **URL**: `POST /portfolio/updateTrade`
   - **Description**: Update an existing trade by `tradeId`.
   - **Request Body**:
     ```json
     {
         "tradeId": 3,
         "quantity": 50,
         "price": 130,
         "date": "2024-09-15",
         "type": "buy"
     }
     ```
   - **Response Example**:
     ```json
     {
         "success": true,
         "data": {
             "_id": "66f7d404acbbbb9126cfbdf8",
             "stock": "ABC",
             "quantity": 50,
             "price": 130,
             "date": "2024-09-15T00:00:00.000Z",
             "type": "buy",
             "tradeId": 3,
             "__v": 0
         }
     }
     ```

### 6. **Remove a Trade**
   - **URL**: `POST /portfolio/removeTrade`
   - **Description**: Remove an existing trade by `tradeId`.
   - **Request Body**:
     ```json
     {
         "tradeId": 3
     }
     ```
   - **Response Example**:
     ```json
     {
         "success": true
     }
     ```

---

## Negative Test Cases

1. **Missing Trade ID in `updateTrade` or `removeTrade`**
   - **Request**: `POST /portfolio/updateTrade` or `POST /portfolio/removeTrade` without providing `tradeId`.
   - **Response**:
     ```json
     {
         "success": false,
         "error": "Please provide the trade ID to update"
     }
     ```

2. **Invalid Trade ID in `updateTrade` or `removeTrade`**
   - **Request**: `POST /portfolio/updateTrade` or `POST /portfolio/removeTrade` with a non-existent `tradeId`.
   - **Response**:
     ```json
     {
         "success": false,
         "error": "Trade not found"
     }
     ```

3. **Invalid Trade Type (other than 'buy' or 'sell')**
   - **Request**: `POST /portfolio/addTrade` or `POST /portfolio/updateTrade` with `type` other than 'buy' or 'sell'.
   - **Response**:
     ```json
     {
         "success": false,
         "error": "Validation failed: type: `invalidType` is not a valid enum value for path `type`."
     }
     ```

4. **Missing Required Fields in `addTrade`**
   - **Request**: `POST /portfolio/addTrade` without providing required fields like `stock`, `quantity`, or `price`.
   - **Response**:
     ```json
     {
         "success": false,
         "error": "Trade validation failed: stock: Path `stock` is required."
     }
     ```

---

## How to Run Tests

- Use tools like Postman or cURL to make API requests to test the routes.
- Ensure MongoDB is running, and the server is started.
- For negative test cases, try sending requests with missing or invalid fields to check the error handling.

---
