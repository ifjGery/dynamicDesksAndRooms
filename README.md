# dynamicDesksAndRooms
a simple react app where you can reserve desks and rooms and leave feedback

## limitations

this page is designed for mobile only, and the following features are not implemented
* changing floors
* zoom function

## features

* you can move the map around
* notifications
  * you can subscribe to rooms or desks to get notified if its reserved of freed
  * you can manage your notifications
  * notifications marked `important` will be displayed in a toast
  * there is a counter for new notifications, and it can be marked as read easily
* rooms and desks
  * you can see if there is a currently free room or desk by color on the map, live
  * they have descriptions, equipment list, and feedback by other users or staff
  * you can manage your reservations
  * you can leave feedback when your reservation ended when clicking on the notification toast
* search
  * you can do a quick search
  * you can do an advanced search, filtering for different options
  * every hit is grouped by where the search text is (id, name, equipment)
* _live_
  * every reservation is broadcasted to connected clients through a websocket
  * feedbacks are also sent

## possible improvements

* navigation path generator
* have interface for staff
* have admin interface to resolve stalemates and force kick anybody from the reserved desk
* show how popular a room or desk is 
* show a graph about stars, popularity, free/reserved status
* design for desktop too

## starting the whole thing

### web
 
this is where the react app lives, simply start with
```
cd web
npm i && npm start
```

### server

the react app can work standalone, but if there is a server, the apps will send and receive messages through the server
```
cd server
npm i && npm react start
```

## screenshots

![login](/assets/img/smaller/login.png) 
![search bar](/assets/img/smaller/search_bar.png)
![advanced search](/assets/img/smaller/advanced_search.png)
![notifications](/assets/img/smaller/notifications.png)
![notification manager](/assets/img/smaller/notification_manager.png)
![rate the desk](/assets/img/smaller/rate.png)
![reserving](/assets/img/smaller/reserving.png)
![reserved desk](/assets/img/smaller/reserved_desk.png)
![desk descripton](/assets/img/smaller/desk_description.png)