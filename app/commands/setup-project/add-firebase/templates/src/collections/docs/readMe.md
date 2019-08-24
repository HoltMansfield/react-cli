Property Definition format:

  <property-name>: {
    type: '<property-type>'
    text: ''
  }

  property-name:
    * must be camelCase *
    -used for variable name corresponding to property
    -broken on uppercase letters to create a label, example:
      termsAndConditions becomes "Terms And Conditions"

  property-type:
    string => text input
    boolean => single checkbox
    date => date picker
    time => time picker
    toggle => toggle switch
    checkboxes => checkboxes (see: checkboxes-example.md)
    radioButtons => radio buttons  (see: radio-buttons-example.md)
    select => drop down select menu (see: two examples in select-example.md)

  text (optional):
    Text to be used for a label, if this is not provided the property name is used
