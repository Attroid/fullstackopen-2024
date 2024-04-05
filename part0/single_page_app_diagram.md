sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: [304 Not modified] HTML File
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: [304 Not modified] JS File
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: [304 Not modified] CSS File
    deactivate server

    Note right of browser: spa.js sends new XMLHttpRequest to fetch data.json
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "test", "date": "2024-04-04T17:49:32.884Z" }, ... ]
    deactivate server

    Note right of browser: redrawNotes() function in spa.js renders notes to browser