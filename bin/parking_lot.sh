#!/bin/bash

# Install dependencies
npm install

if [ "$#" -ne 1 ]; 
then
	npm run start:console
else
	npm start $1
fi