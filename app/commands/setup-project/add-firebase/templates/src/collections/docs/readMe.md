Step 1:
    Create a file in the src/collections folder corresponding to the name of your firebase collection
    example: src/collections/teams

    Collections here MUST have a file name in plural form
    when running cli commands always use the singular form
    (we use a pluralization engine)

    If this collection has not been created in firebase it will be automatically created the first time you    try to use it

Step 2:
  Starting with the example.js document in this folder define a schema following the rules below



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
