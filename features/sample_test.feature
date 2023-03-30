Feature: Google Search Feature
User can search for a particular product or service by typing the name of the product or service in the search box. 
The search results will be displayed on the screen. 
The user can select the product or service and can view the details of the product or service.

    @SMOKE
    Scenario Outline: User searches for a product or service using Google search
      Given the user is on the Google search page
      When the user types "<homepage_title>" in the search box
      And the user clicks on the search button
      Then the search result - "<search_results_title>" will be displayed on the screen

    Examples:
      | homepage_title      | search_results_title |
      | TestDevLab          | TestDevLab           |
      | Instagram           | Instagram            |
