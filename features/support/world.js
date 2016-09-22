'use strict';

function World() {
  // this.browser = new zombie(); // this.browser will be available in step definitions
}

module.exports = function() {
  this.World = World;
};
