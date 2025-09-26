## Crypto Price Monitoring & Alerting System

A real-time cryptocurrency price monitoring and alerting system with caching optimizations using Node.js, TypeScript, Redis, MongoDB, and React.

## Features

Real-time Monitoring: Fetch live cryptocurrency prices from CoinGecko API.

Alerting System: Users can set price alerts (above/below thresholds) and get real-time notifications.

Caching: Recent prices cached in Redis for fast responses and reduced API calls.

Frontend: Simple React interface to view prices and create alerts.

## Tech Stack

Backend: Node.js, Express.js, TypeScript

Database: MongoDB

Cache: Redis

Real-time: Socket.IO

Frontend: React, Axios, React-Toastify

## Usage

Select a coin and currency, then fetch the latest price.

Create alerts for specific price targets.

Receive real-time notifications when alerts are triggered.

## Notes

Redis caches each price for 30 seconds to reduce API calls.

Only coins requested by users are continuously polled.

Error handling implemented for invalid coin or currency requests.