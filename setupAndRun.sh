#!/bin/bash

cd frontend
npm install
npm run build

cd ..

cd backend
npm install

sudo node index.js
