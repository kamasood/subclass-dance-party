// Choose random dancer
//  teleport *near* other dancer

var makeSocialDancer = function (top, left, timeBetweenSteps) {
  makeDancer.apply(this, arguments);
};

makeSocialDancer.prototype = Object.create(makeDancer.prototype);
makeSocialDancer.prototype.constructor = makeSocialDancer;

makeSocialDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);

  let random = Math.floor(Math.random() * window.dancers.length);
  let randomDancer = window.dancers[random].$node;

  // get CSS properties

  let targetTop = $(randomDancer).css('top');
  let targetLeft = $(randomDancer).css('left');

  // returns either -1 or 1
  let sign = function () {
    return (Math.floor(Math.random() * 2)) === 0 ? -1 : 1;
  };

  let newTop = 10 + (Math.random() * 10);
  newTop *= sign();
  let newLeft = 10 + (Math.random() * 10);
  newLeft *= sign();

  let styleSettings = {
    top: newTop,
    left: newLeft
  };

  this.$node.css(styleSettings);

};