$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-constructor');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('.danceFloor').height() * Math.random(),
      $('.danceFloor').width() * Math.random(),
      Math.random() * 1000
    );
    $('.danceFloor').append(dancer.$node);

    window.dancers.push(dancer);
  });

  $('.lineUpButton').on('click', () => {
    Math.TAU = 2 * Math.PI;

    var nonSocials = [];
    for (let i = 0; i < window.dancers.length; i++) {
      if (!window.dancers[i].$node.hasClass('social')) {
        nonSocials.push(window.dancers[i]);
      }
    }

    if (nonSocials !== 0) {
      let n = nonSocials.length;
      let windowHeight = $('.danceFloor').height();
      let windowWidth = $('.danceFloor').width();
      let r = Math.min(windowHeight, windowWidth) * 0.4;

      for (let i = 0; i < n; i++ ) {
        let theta = (Math.TAU / n) * i;

        let x = (r * Math.cos(theta)) + (windowWidth / 2);
        let y = (r * Math.sin(theta)) + (windowHeight / 2);

        nonSocials[i].lineUp(y, x);
      }
    }
  });
});

