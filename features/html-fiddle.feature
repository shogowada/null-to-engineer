Feature: HTML fiddle

  @gui
  Scenario: Run HTML fiddle
    When I execute the following HTML:
    """
    <div>Hello, World!</div>
    """
    Then it should output the following HTML:
    """
    <div>Hello, World!</div>
    """
