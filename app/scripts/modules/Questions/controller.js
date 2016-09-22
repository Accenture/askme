define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Questions/views/Questions'
], function($, _, Backbone, QuestionsSectionView) {
    'use strict';

    var initialize = function() {
        (new QuestionsSectionView()).render();
    };

    return {
        initialize: initialize
    };
});