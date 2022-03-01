var makeSquareDancer = function(top, left, timeBetweenSteps) {
  makeDancer.apply(this, arguments);

  this.$node.addClass('square');

};

makeSquareDancer.prototype = Object.create(makeDancer.prototype);
makeSquareDancer.prototype.constructor = makeSquareDancer;

makeSquareDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  makeDancer.prototype.step.call(this);

  // set original position

  this.$node.animate({
    top: '+=50px'
  }).animate({
    left: '-=50px'
  }).animate({
    top: '-=50px'
  }).animate({
    left: '+=50px'
  });
};