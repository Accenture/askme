'use strict';

define(['handlebars'], function (Handlebars) {
    var NUMBER_OF_DECIMALS = 1;
    Handlebars.registerHelper('handleVotes', function(numberOfVotes) {
        return numberOfVotes === '1' ? '' : 's';
    });

    Handlebars.registerHelper('takeName', function(string) {
        return string.split(':')[0];
    });

    Handlebars.registerHelper('takeMessage', function(string) {
        return string.split(':')[1].trim();
    });

    Handlebars.registerHelper('capitalize', function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    });

    Handlebars.registerHelper('trimFloat', function(num) {
        return Number((num).toFixed(NUMBER_OF_DECIMALS));
    });
});
