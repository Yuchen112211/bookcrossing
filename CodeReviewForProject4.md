Your website looks good. And running Axe accessibility test shows no errors/warnings.
Overall, I think you did a great job on this project!
The following are some suggestions to furthur improve your website:

- It’s great to see that your website functions properly while using only the keyboard.
But I suggest that you add some colors changes to your onfocus event to let users aware that they are currently focusing on an element. 
One issue I found is that when I focus on <a> tags, for example the <a> tag below the sign in button which will redirect to the register page, 
there is barely no color or other style changes for the element,
so it’s hard to me to realize that I’m actually focusing on this element and can press enter key to navigate to register.

- The Sent/Receive/Traveling buttons on the Profile page should also be focusable and clickable using keyboard. 

- Showing error on the bottom of a page is not very user-friendly.
For users with smaller screens, those messages might be out of their screen.
They cannot see the errors unless they scroll down, so they might be confused and don’t know what happens.
I’ll suggest show error/success messages using a Toast. 

- On your Library page, after I search for a book, the search bar disappears and you show the search result summary/message instead.
I think this is also not very user-friendly to hide the search bar,
since if you do so, the only way I can do another search is to jump to another page and go back.
I'll suggest keep the search bar and show the search messages on the bottom of that. 

