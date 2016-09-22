Feature: User can add a new question to the Question List
  As a user of AskMe
  I want to add a question to the list
  So that my question can be answered live

  Scenario: Question added to question list
    Given I have an question list
    When I add an question to the list
    Then The question list contains a single item
