RuleObject = {              // Rule Accessor
  checkThresholdRule: function(ruleObj){
    if(ruleObj.payment > ruleObj.threshold)
      return RuleAction.thresholdPassed;

    return RuleAction.thresholdOkay;
  },
}

RuleAction = {
  thresholdPassed: true,
  thresholdOkay: false
}
