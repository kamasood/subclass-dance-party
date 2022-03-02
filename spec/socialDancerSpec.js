describe('socialDancer ', function() {

  var socialDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    window.dancers = [];

    window.dancers.push(new makeDancer(100, 100, timeBetweenSteps));

    socialDancer = new makeSocialDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(socialDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that changes its nodes css', function() {
    sinon.spy(socialDancer.$node, 'css');
    socialDancer.step();
    expect(socialDancer.$node.css.called).to.be.true;
  });

  // TODO: Check that it actually moves to the other dancer
  it('should move near other dancers', function() {
    socialDancer.step();

    // Absolute value of the difference between socialDancer and windowDancer
    let topDiff = Math.abs(parseInt(socialDancer.$node.css('top')) - parseInt(window.dancers[0].$node.css('top')));
    let leftDiff = Math.abs(parseInt(socialDancer.$node.css('left')) - parseInt(window.dancers[0].$node.css('left')));

    expect(topDiff).to.be.at.most(30);
    expect(leftDiff).to.be.at.most(30);
  });

  describe('dance', function() {
    it('should call step a bit less often than 1 second', function() {
      sinon.spy(socialDancer, 'step');
      expect(socialDancer.step.callCount).to.be.equal(0);
      clock.tick((timeBetweenSteps * 2) + 1000); // ? it seems an extra tick is necessary...
      clock.tick((timeBetweenSteps * 2) + 1000);

      expect(socialDancer.step.callCount).to.be.equal(1);

      clock.tick((timeBetweenSteps * 2) + 1000);
      expect(socialDancer.step.callCount).to.be.equal(2);
    });
  });
});
