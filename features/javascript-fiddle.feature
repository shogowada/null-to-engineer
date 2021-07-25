Feature: JavaScript fiddle

  @gui
  Scenario: Run JavaScript fiddle
    When I execute the following JavaScript:
    """
    console.info("This is info");
    console.log("This is log");
    console.warn("This is warn");
    console.error("This is error");
    console.debug("This is debug");
    [1, 2, 3].forEach(value => console.log(`Value: ${value}`));
    """
    Then it should output the following console logs:
      | level | message       |
      | info  | This is info  |
      | log   | This is log   |
      | warn  | This is warn  |
      | error | This is error |
      | debug | This is debug |
      | log   | Value: 1      |
      | log   | Value: 2      |
      | log   | Value: 3      |

  @gui
  Scenario: Run JavaScript fiddle
    When I execute the following JavaScript:
    """
    console.log("This is log");
    console.clear();
    console.log("This is log after the clear");
    """
    Then it should output the following console logs:
      | level | message                     |
      | log   | This is log after the clear |

  @gui
  Scenario: Log error
    When I execute the following JavaScript:
    """
    const x = 0;
    x = 1;
    """
    Then it should log an error containing "TypeError"

  @gui
  Scenario: Log custom error
    When I execute the following JavaScript:
    """
    throw new Error("Do not panic! This is only a test.");
    """
    Then it should log an error containing "Do not panic! This is only a test."

  @gui
  Scenario: Log syntax error
    When I execute the following JavaScript:
    """
    const 1;
    """
    Then it should log an error containing "SyntaxError"
