'use strict';

/*
 * The general structure of this code is that all the timeline information for
 * a particular day is retrieved from the Timeline factory and put into the scope.
 * For best performance, all data should be loaded into the in-memory timeline,
 * and in addition to writing to storage, the data should be written to memory.
 * All UI elements should only use $scope variables.
 */

angular.module('emission.main.diary.infscrollfilters',[
    'emission.tripconfirm.services',
    'emission.plugin.logger'
  ])
.factory('InfScrollFilters', function(Logger, ConfirmHelper, $translate){
    var sf = {};
    var unlabeledCheck = function(t) {
       return ConfirmHelper.INPUTS
           .map((inputType, index) => !angular.isDefined(t.userInput[inputType]))
           .reduce((acc, val) => acc || val, false);
    }

    var invalidCheck = function(t) {
       const retVal = 
           (angular.isDefined(t.userInput['MODE']) && t.userInput['MODE'].value === 'pilot_ebike') &&
           (!angular.isDefined(t.userInput['REPLACED_MODE']) ||
            t.userInput['REPLACED_MODE'].value === 'pilot_ebike' ||
            t.userInput['REPLACED_MODE'].value === 'same_mode');
       return retVal;
    }

    var toLabelCheck = function(trip) {
        console.log(trip.expectation.to_label)
        return trip.expectation.to_label && unlabeledCheck(trip);
    }

    sf.UNLABELED = {
        text: $translate.instant(".unlabeled"),
        filter: unlabeledCheck
    }

    sf.INVALID_EBIKE = {
        text: $translate.instant(".invalid-ebike"),
        filter: invalidCheck
    }

    sf.TO_LABEL = {
        text: $translate.instant(".to-label"),
        filter: toLabelCheck
    }
    return sf;
});
