Feature: Users can post questions to Twitter
  As a user of AskMe
  I want to post questions to Twitter
  In order to make my feedback public

  Scenario: Tweet a AskMe Feedback
    Given I have entered a feedback
    When I press the Tweet button
    Then I should see a tweet with my question ready to be tweeted
