=================================================================================================
=================================================================================================
============================ Installation/Running Instructions for Parcel tracker app ===========
=================================================================================================
=================================================================================================


Please follow the instructions for setting up the applications.

1) Extract the archive and it contains three folder or applications (Sender App, Biker App and Backend APIs).
	- Sender and Biker app is build using React.js and used latest version.
	- Backend is developed using Node.js and express framework.
	
3) Run the "npm install" command in all three folders(from the root folder of each project) to install the dependencies.

4) Once "npm install" finished, then run the following commands to start each application.
	- for "sender" and "biker": run "npm start" command, from the root of the project.
	- for the backend run "npm run dev" or "npm start" to startup the server.
	
NOTE: if you are going to change the port number in the backend, node project, then please update the API URL in the .env file of
		each project(Sender and Biker) accordingly.
		
		

5) Postman collection of the APIs is included in the backend project folder, in the root.


6) For both Senders and Bikers, same password is used for the sake of simplicity and testing.
	
	Password: admin123
	
	- Blow is the list of Senders Emails and Bikers email, so use them while loggin in to the sender or biker application.
	
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Sender Emails ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	- sender@gmail.com
	- sara@khan.com
	- micheal@example.com
	- john@doe.com
	- lily@smith.com
	
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Biker Emails ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	- amin@gmail.com
	- ali@gmail.com
	- salman@gmail.com
	- subhan@gmail.com
	- saima@gmail.com
	- fazal@gmail.com
	- anwar@gmail.com
	
	
	You can find the whole list of users in the backend:  parcel-tracker-backend/src/database/users.js
	and users are separated by "type field".
	
	
	
	Thanks. ;)