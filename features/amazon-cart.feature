Feature: Amazon Cart Management
  As a user, I want to add products to my cart so I can purchase them.

  Background:
    Given I am logged into Amazon

  Scenario Outline: Add a product to cart
    When I search for "<product>"
    And I open the first product matching "<productPath>"
    And I add the product to cart
    Then the cart count should increase

    Examples:
      | product          | productPath          |
      | iPhone 15        | iPhone 15            |
      | Samsung Galaxy   | Samsung Galaxy       |