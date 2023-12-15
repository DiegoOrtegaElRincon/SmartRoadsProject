
# 1. Introduction

The SmartRoad project, in collaboration with the Instituto Tecnológico de Canarias and the IES El Rincón Center of Excellence Project, focuses on creating an OpenData service for centralizing mobility-related data. Its main objective is to anonymously collect information on various mobility elements such as traffic signs, traffic lights, road conditions, and vehicles. This project aims to establish a knowledge base (BigData) to serve other projects, such as traffic jam prevention and emergency alerts. Proposed then, the development of "Cyclist Alert", an application that warns drivers about the presence of cyclists on their route, using SmartRoad's public records to detect potential encounters between vehicles and cyclists.

# 2. Diagrams (Data Model)

[SmartRoads E-R.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675437/SmartRoads.E-R.pdf)

Main Entities: The diagram shows main entities such as ActiveElement, ChangingElement, PassiveElement, and Spot. Each with specific attributes like UID, Type, and Location.

Relationships: There is a significant relationship between ActiveElement, ChangingElement, and Spot. For example, an ActiveElement can have multiple Spots, indicating multiple locations or events associated with an active element.

Attributes: Attributes like UID (Unique Identifier), Type (Type of element), and Status (State of the element) are fundamental for data identification and management in the system.

Administration: The Administrator entity suggests a user management system with attributes like ID, Password, and Username, essential for system security and administration.

[SmartRoads Relational.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675454/SmartRoads.Relational.pdf)

The relational diagram of SmartRoads shows the key entities and their relationships. It includes:

ActiveElement: Active entities on the road (signals, traffic lights) with attributes like UID, type, speed, and status.

ChangingElement: Elements that can change state, like dynamic signs, with UID, type, status, and location.

PassiveElement: Passive elements (for example, static signs) identified by UID, type, and location.

Spot: Specific locations on the road linked to active elements.

Info: Information associated with elements, with IDUID and detailed information.

Administrator: Data of the system administrators, including ID, password, and username.


This model establishes the data structure for managing and tracking road elements in the SmartRoads project.

[SmartRoads UML.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675456/SmartRoads.UML.pdf)


# 3. User Requirements

General Description: Summary of users' needs.

Functional Requirements: List of all required functionalities.

Non-Functional Requirements: Aspects such as security, performance, and usability.


# 4. Use Cases
[SmartRoads Case-Use.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675424/SmartRoads.Case-Use.pdf)

Cyclist: Their role is to send their location to the system.

Driver: Can receive notifications from the system.

Administrator: Responsible for managing data within the system.

# 5. Operation and Technical Specifications

System Architecture: Description of the technical structure.

Key Components: Description of the main parts of the system.

Data Flows: How data moves within the system.

Integrations: Connections with other systems or services.

# 6. -

ActiveElement (UID, Type, Speed, Status)
ChangingElement (UID, Type, Status, Location)
PassiveElement (UID, Type, Location)
Spot (ActiveElement_UID*, Location)
Info (IDUID*, Information)
Administrator (ID, Password, Username)

# 9. Technology Stack
NodeJS: Used as a server-side JavaScript execution environment. Chosen for its efficiency and scalability, especially in real-time applications.
ExpressJS: A minimalist and flexible framework for NodeJS, used to build web applications and APIs. Its simplicity and ability to integrate with other technologies make it ideal for this project.
Sequelize: An ORM (Object-Relational Mapping) for Node.js, supporting SQL database management. It facilitates database operations and allows writing database code in JavaScript.
React: A JavaScript library for building user interfaces. Used for the frontend due to its efficiency and ability to create dynamic and high-performance web applications.

## Comparison of Application Architectures for SmartRoads

The SmartRoads project aims to centralize mobility data and provide critical services such as 'Cyclist Alert' to enhance road safety. Here's how different application architectures align with our project goals:

### Native Apps
- **Advantages:**
  - Optimal performance which is crucial for real-time data processing and alerts.
  - Direct access to hardware features such as GPS and push notifications, enhancing the functionality of Cyclist Alert.
- **Disadvantages:**
  - Separate development for Android and iOS can be resource-intensive, which may not be ideal for our initial development phase.

### Hybrid Apps
- **Advantages:**
  - Ability to reach both Android and iOS users with one codebase aligns with our goal for a broad and inclusive data collection.
  - Quicker prototyping which can speed up the initial launch of our project.
- **Disadvantages:**
  - Performance trade-offs could affect the responsiveness of real-time alerts.

### Web Apps
- **Advantages:**
  - Immediate accessibility through a browser without the need for downloads could encourage more users to contribute mobility data.
  - Easier to update and maintain, which is beneficial for a project that evolves based on collected data.
- **Disadvantages:**
  - Limited functionality in terms of native device features may restrict the capability of the Cyclist Alert system.

### Progressive Web Apps (PWA)
- **Advantages:**
  - A middle ground with a native-like experience that can leverage device capabilities to a certain extent.
  - Installable and capable of functioning offline, which ensures that users can receive alerts even in areas with poor connectivity.
- **Disadvantages:**
  - The varying degree of support across browsers can lead to inconsistent experiences for users.

Given the project's focus on data centralization and real-time alerts, we are initially leaning towards a **PWA**. This approach allows us to leverage a wider user base with the installability and offline capabilities of a native app, while maintaining the ease of updates and maintenance of a web application. It also enables us to push updates quickly as the project scales and as user feedback is integrated into the application development.

