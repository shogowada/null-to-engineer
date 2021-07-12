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
    });
    """
    Then "p" element should have "backgroundColor" styled as "rgb(255, 0, 0)"
