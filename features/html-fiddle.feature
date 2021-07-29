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

  @gui
  Scenario: Run CSS fiddle as element
    When I execute the following HTML:
    """
    <style>
      p {
        background-color: #FF0000;
      }
    </style>
    <p>Hello, World!</p>
    """
    Then "p" element should have "backgroundColor" styled as "rgb(255, 0, 0)"

  @gui
  Scenario: Run CSS fiddle as file
    When I execute the following:
    """
    // HTML
    <p>Hello, World!</p>
    // CSS
    p {
      background-color: #FF0000;
    }
    """
    Then "p" element should have "backgroundColor" styled as "rgb(255, 0, 0)"

  @gui
  Scenario: Run JavaScript, HTML, CSS fiddle
    When I execute the following:
    """
    // HTML
    <button id="create-element" type="button">Create Element</button>
    <div id="paragraphs"/>
    // CSS
    p {
      background-color: red;
    }
    // JavaScript
    document.getElementById("create-element").addEventListener("click", () => {
      const pElement = document.createElement("p");
      pElement.innerHTML = "Hello, World!";

      const paragraphsElement = document.getElementById("paragraphs");
      paragraphsElement.appendChild(pElement);

      console.log("Hello, World!");
    });
    """
    And I click on "#create-element" element
    Then "p" element should have "backgroundColor" styled as "rgb(255, 0, 0)"
    And it should output the following console logs:
      | level | message       |
      | log   | Hello, World! |

  @gui
  Scenario: Declaring the same global variable over multiple executions
  Because it needs to clear its namespace on every run
    When I execute the following:
    """
    // HTML
    <button id="button" onclick="onClick();">Test</button>
    <div id="output"/>
    // JavaScript
    const onClick = () => {
      document.getElementById("output").innerHTML = "Hello, World!";
    };
    """
    And I click on "#button" element
    Then "#output" element should say "Hello, World!"
    When I execute the following:
    """
    // HTML
    <button id="button" onclick="onClick();">Test</button>
    <div id="output"/>
    // JavaScript
    const onClick = () => {
      document.getElementById("output").innerHTML = "Let's say something else!";
    };
    """
    And I click on "#button" element
    Then "#output" element should say "Let's say something else!"
    And I should see no error log

  @gui
  Scenario: Render React
    When I execute the following HTML:
    """
    <script
      src="https://unpkg.com/react@17/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
      crossorigin
    ></script>

    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <div id="root"/ >

    <script type="text/babel">
      const mountElement = document.getElementById("root");
      ReactDOM.render(<h1>Hello, World!</h1>, mountElement);
    </script>
    """
    Then it should output the following HTML:
    """
    <div id="root"><h1>Hello, World!</h1></div>
    """

  @gui
  Scenario: Render React
    When I execute the following React:
    """
    // </script> writing a closing script tag here should have no effect
    const mountElement = document.getElementById("root");
    ReactDOM.render(<h1>Hello, React!</h1>, mountElement);
    """
    Then it should output the following HTML:
    """
    <div id="root"><h1>Hello, React!</h1></div>
    """

  @gui
  Scenario Outline: Remember code for <fiddleType> fiddle
    Given I have some code for <fiddleType> fiddle
    And I wait for 2 seconds
    When I refresh the page
    Then it should remember the code
    Examples:
      | fiddleType        |
      | JavaScript        |
      | JavaScriptHTMLCSS |
      | HTML              |
      | HTMLWithCSS       |
      | React             |
