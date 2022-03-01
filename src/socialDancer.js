// Choose random dancer
//  teleport *near* other dancer

var makeSocialDancer = function (top, left, timeBetweenSteps) {
  timeBetweenSteps = 1000 + (timeBetweenSteps * 2);
  makeDancer.apply(this, arguments);

  this.$node.addClass('social');
};

makeSocialDancer.prototype = Object.create(makeDancer.prototype);
makeSocialDancer.prototype.constructor = makeSocialDancer;

makeSocialDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);

  let targetTop, targetLeft;
  if (window.dancers.length !== 0) {
    let random = Math.floor(Math.random() * window.dancers.length);
    let randomDancer = window.dancers[random].$node;

    // get CSS properties
    targetTop = $(randomDancer).css('top');
    targetLeft = $(randomDancer).css('left');
  } else {
    targetTop = $('body').height() / 2;
    targetLeft = $('body').width() / 2;
  }

  // returns either -1 or 1
  let sign = function () {
    return (Math.floor(Math.random() * 2)) === 0 ? -1 : 1;
  };

  let annoySomeone = function (target) {
    let out = 20 + (Math.random() * 10); // Value between 20 and 30

    out *= sign(); // Make it either positive or negative

    out += parseInt(target); // Offset by targetPos

    return out;
  };

  let newTop = annoySomeone(targetTop);
  let newLeft = annoySomeone(targetLeft);

  let styleSettings = {
    top: newTop,
    left: newLeft
  };

  this.$node.css(styleSettings);

};