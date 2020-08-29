# Store Manager

## What is this?

- A web app which manages a storefront (Not currently fully implemented)

## What technologies does this use?

- Nodejs + Express

- A file based data repository

- Bulma for styling

- Plain ol' (very modern) JavaScript

## But why?

- I wanted to learn how to build a fairly simple Express powered nodejs server

- I wanted to learn how to build my own authentication pattern

- The administration panel is actually pretty fine as a standalone item, so it can be copied across multiple projects that require a authentication

## What is the current feature set?

- Currently, a user is presented with the products page initially.

- User does not need to sign up or sign in to add products to their cart - it's tied to their cookie

- User can add and remove items from their cart

- Admin can add and remove products from the storefront

- Admin panel can be accessed from /admin

## What third party libraries were used, and for what?

- body-parser -> Used because there are too many edge cases with parsing data that would have slowed down development time

- cookie-session -> Simplifies management of session cookies, another tedious task which would have slowed down development time

- express-validator -> Used as a middleware to sanitize post requests and validate that they have the required info in the correct format

- multer -> Used to parse file data, so users can upload files

## What could be improved in a potential V2?

- Currently using a json file for all of my data repositories. Ideally would move to a Postgres database in the future

- Currently storing files in base64 encoded strings. Would like to use a cloud service like Cloudinary in the future in order to store and serve images

- Can't actually buy anything, even with fake info. Would like to implement a checkout feature that simulates making a purchase

- Products need to be added one at a time, would be nice to be able to upload a csv and have the products list get updated (probably only possible once images are stored in the cloud)

- Design is pretty minimal, which might be okay, but I'd like to get more color on the page, and possibly some kind of landing page

- Products are pretty basic, would be nice to add something like tags or multiple varieties (color, size, etc)
