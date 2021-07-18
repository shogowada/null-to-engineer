Feature: JavaScript fiddle

  @gui
  Scenario: Run JavaScript fiddle
    When I execute the following JavaScript:
    """
    console.info("This is info️");
    console.log("This is log");
    console.warn("This is warn️");
    console.error("This is error");
    console.debug("This is debug");
    [1, 2, 3].forEach(value => console.log(`Value: ${value}`));
    """
    Then it should output the following execution result:
    """
    This is info️
    This is log
    This is warn️
    This is error
    This is debug
    Value: 1
    Value: 2
    Value: 3
    """

  @gui
  Scenario: Run JavaScript fiddle
    When I execute the following JavaScript:
    """
    console.log("This is log");
    console.clear();
    console.log("This is log after the clear");
    """
    Then it should output the following execution result:
    """
    This is log after the clear
    """