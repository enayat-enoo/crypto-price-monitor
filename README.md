# Crypto Price Monitoring

Run:
1. Ensure MongoDB and Redis are running (Redis on 127.0.0.1:6379).
2. Install deps: npm install
3. Dev: npm run dev
   or Build+Start: npm run build && npm start

Endpoints:
- GET /api/price?coin=bitcoin&currency=usd
  -> Returns the latest price (uses Redis cache with TTL)

- POST /api/alerts
  Body:
  {
    "coinID": "bitcoin",
    "currency": "usd",
    "targetPrice": 27000,
    "condition": "above"  // or "below"
  }
  -> Stores alert in MongoDB. A background job evaluates alerts periodically and logs triggers.

Notes:
- Redis used to cache `price:<coin>:<currency>` with TTL (30s).
- Alert evaluator uses cached/latest price and marks alerts as `triggered` once fired.
- Notifications currently print to console; can be replaced with Socket.IO or email.
