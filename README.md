This app allows users to trade their books with other users.
This project is hosted on heroku at: https://the-book-thing.herokuapp.com/.  
Only guaranteed to work in chrome. 

To run locally,   
npm install the-book-thing  
cd the-book-thing  
npm run dev...to run in development mode     
npm run prod-test...to run in production mode  

Note that if you run in production mode, you will need to delete the bundle folder in the public folder to make changes. Otherwise, the old bundle will be served from that folder. 

This project fulfills the following user stories:  
User Story: I can view all books posted by every user.  
User Story: I can add a new book.  
User Story: I can update my settings to store my full name, city, and state.  
User Story: I can propose a trade and wait for the other user to accept the trade.  

Built on top of the react-hot-boilerplate by Dan Abramov: https://github.com/gaearon/react-hot-boilerplate