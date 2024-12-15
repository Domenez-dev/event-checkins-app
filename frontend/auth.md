# authentication
## we had a signin and a login function
## 1.signin: 
### we post the email and password and we get the token that we store it in an asyncsession that we gonna use it to set authorizatio also we get a is_admin bollean that is set to true if the user an admin and false if not and we use it in event for that just admins can work on it 
## 2.logout:
### when user logout we gonna post the tohen to backend endpoint that gonna delete it then we remove the token from asyncsession and set the isadmin to null  
## checkQR:
this page allowed for super user and admin 
## event:
this page allowed only for admin so simple user cant access to this page
