# bookcrossing

A Book Sharing Platform  
Website: https://bookcrossing-neu.herokuapp.com/

## Author

- Yuchen Xie (xie.yuch@northeastern.edu)
- Zhi Wen (wen.zhi@northeastern.edu)

## Class Link

CS5610 Web Development: https://johnguerra.co/classes/webDevelopment_spring_2021/

## Project Objective

To build an book sharing platform, allowing users to exchange books.

## How does it work? 

1. Request an address and a Book ID
2. Mail a book to that address
3. Receive a book from another bookcrosser!
4. Register the Book ID you have received
5. Go to number 1 to receive more books!

# Introduction

## Screenshot
![](https://raw.githubusercontent.com/Yuchen112211/bookcrossing/main/public/img/screenshot-bookcrossing.png)

## Slides 

<!-- TODO -->
[Google Slides]() 

## Video demo

<!-- TODO -->
[Demo]()

# Instructions to build

1. Run the following command to download the source code:

   ```
   git clone https://github.com/Yuchen112211/bookcrossing.git
   ```

2. Use npm to install dependencies:

   ```
   npm install
   ```

3. Add your local .env file to contain your MongoDB url
  - In .env file, at least add DB_URL
    ```
    DB_URL=mongodb+srv://username:password@.....
    ```

4. Start the server:
   ```
   npm start
   ```

# References

- Code style: [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- UI: [Now UI Kit React](https://github.com/creativetimofficial/now-ui-kit-react)