Creating new app via Angular CLI

Step 1: 
-------
ng new <app-name> -dir=./<new_folder_name> --style=scss

Step 2:
-------
cd in dir -> npm install

Step 3:
-------
ng serve to start application

// npm install --save hammerjs @angular/animations@latest @angular/material@latest

Ready to use material design now
Use <md-toolbar> for navbar like menu.

Step 4:
-------
Generating new component - 

ng generate component <component-name>
Eg: component with menu will have selector <app-menu>. Add this to app.component.ts.

New folder for shared stuff -> under src/app. Folder name shared.
Create a dish class in shared/dish.ts and declare it as JS object with different properties.

Update menu.component.ts to import shared/dish and in export class for MenuComponent, set variable (eg: dishes = Dish[] and describe different variables.
Eg:
dishes: Dish[] = [
                     	{
                           name:'Uthappizza',
                           image: '/assets/images/uthappizza.png',
                           category: 'mains',
                           label:'Hot',
                           price:'4.99',
                           description:'A unique combination of Indian Uthappam (pancake) 				and Italian pizza, topped with Cerignola olives, ripe vine 				cherry tomatoes, Vidalia onion, Guntur chillies and 					Buffalo Paneer.'                        
			},

use this as:
<img md-list-avatar src={{dish.image}} alt={{dish.name}}>
    <h1 md-line> {{dish.name}} </h1>
    <p md-line>

Step 5: 
-------
To update the part of the DOM under <app-menu> we update the menu.component.html file.
We can also define the dishes array of objects as constant.
Add card component etc... whatever is needed.

Creating a service:
	- Create new fold in src/app called services
	- ng generate service services/dish
	- add method in dish.service.ts
	- import DishService in app.module and add Dish Service to providers


##########################################################################################


Design Pattern - well documented solution to a recurring problem
-------------- - reusable
	       - gang of four - four authors who wrote book design patterns - well 			 documented exploration of design patterns

The MVC framework:
------------------
SE architecture pattern - isolation of domain login from UI
Independent development, testing and maintenance - *seperation of concerns*

	Model	- manages behavior of data of application
		- responds to requests for info
		- responds to instruction to change state
		- in event-driven systems - model notifies observers for change of info

	View 	- renders the model into a form suitable for interaction
		- multiple views can exist for a single model
		- viewport typically has one to one correspondence with display surface

    Controller 	- receives user input and initiates a response by making calls				- accept input from user and instruct the model to change state.

Model View View-Model
----------------------
Descendent of MVC (also called Model-View-Binder).
Declarative data binding.

View 	- View Model helps Data Binding - Presentation and Presentation Logic
Model 	- Business Logic and Data



Angular Services:
-----------------
Services needed to:
	- Keep component classes as lean as possible.
	- delegate all work such as fetching data, validating user input etc to a service.
	- try to factor out application logic into services and let them do the work.

service -> component -> template

Dependency Injection:
---------------------
Software Design Pattern that implements inversion of control for resolving dependencies.
	-Dependency - An object that can be used as a service.
	- Injection - Passing of a dependency to a dependent object so that it can use it.

3 ways for a component to get hold of dependencies:
	- Create dependency using new operator.
	- Look up dependency using a global variable.
	- Have dependency passed where needed.
	
	3rd option most flexible as hard coding not needed and also eases testing.

DI involves 4 roles:
	- The service
	- the client dependent on service
	- the interface - how to make use of service
	- the injector

#########################################################################################

Angular Router
--------------
- Enable navigation among views
- Use browser URL as an instruction
- HTML5 History API: Gives devs the ability to modify website URL without a page refresh.
	- pushState(), replaceState(), configure <base href="/">





