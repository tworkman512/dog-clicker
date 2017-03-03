
/* ======= Model ======= */

var model = {
  currentDog: null,
  dogs: [
    {
      "name": "Rosco One",
      "image": "images/rosco-1.JPG",
      "clickCount": 0
    },
    {
      "name": "Rosco Two",
      "image": "images/rosco-2.JPG",
      "clickCount": 0
    },
    {
      "name": "Rosco Three",
      "image": "images/rosco-3.JPG",
      "clickCount": 0
    },
    {
      "name": "Rosco Four",
      "image": "images/rosco-4.JPG",
      "clickCount": 0
    },
    {
      "name": "Rosco Five",
      "image": "images/rosco-5.JPG",
      "clickCount": 0
    }
  ]
};

/* ======= Octopus... Controller or whatever you want to call it ======= */

var octopus = {

  init: function() {
    // set our current dog to the first one in the list
    model.currentDog = model.dogs[0];

    // tell our views to initialize
    dogListView.init();
    dogView.init();
  },

  getCurrentDog: function() {
    return model.currentDog;
  },

  getDogs: function() {
    return model.dogs;
  },

  // set the currently selected dog to the object passed in
  setCurrentDog: function(dog) {
    model.currentDog = dog;
  },

  // increments the counter for the currently selected dog
  incrementCounter: function() {
    model.currentDog.clickCount++;
    dogView.render();
  }
};

/* ======= View ======= */

var dogView = {

  init: function() {
      // store pointers to our DOM elements for easy access later
      this.dogElem = document.getElementById('dog');
      this.dogNameElem = document.getElementById('dog-name');
      this.dogImageElem = document.getElementById('dog-img');
      this.countElem = document.getElementById('dog-count');

      // on click, increment the current dog's counter
      this.dogImageElem.addEventListener('click', function(){
        octopus.incrementCounter();
      });

      // render this view (update the DOM elements with correct values)
      this.render();
  },

  render: function() {
    // update the DOM elements with values from the current dog
    var currentDog = octopus.getCurrentDog();
    this.countElem.textContent = currentDog.clickCount;
    this.dogNameElem.textContent = currentDog.name;
    this.dogImageElem.src = currentDog.image;
  }
};

var dogListView = {

  init: function() {
    // store the DOM elements for easy access later
    this.dogListElem = document.getElementById('dog-list');

    // render this view (update the DOM elements with correct values)
    this.render();
  },

  render: function() {
      var dog, elem, i;
      // get the dogs we'll be rendering from the octopus
      var dogs = octopus.getDogs();

      // empty the dog list
      this.dogListElem.innerHTML = '';

      // loop over the dogs
      for (i = 0; i < dogs.length; i++) {
        // this is the dog we're currently looping over
        dog = dogs[i];

        // make a new dog list item and set its text
        elem = document.createElement('li');
        elem.textContent = dog.name;

        // on click, setCurrentDog and render the dogView
        // this uses closure-in-a-loop trick to connect the value
        // of the dog variable to the click event
        elem.addEventListener('click', (function(dogCopy) {
          return function() {
            octopus.setCurrentDog(dogCopy);
            dogView.render();
          };
        })(dog));

        // finally, add the element to the list!!!
        this.dogListElem.appendChild(elem);
      }
  }
};

// fire it off!!!
octopus.init();
