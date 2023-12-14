1.- Introducción

El proyecto SmartRoad, en colaboración con el Instituto Tecnológico de Canarias y el Proyecto de centro de Excelencia del IES El Rincón, se enfoca en crear un servicio de OpenData para la centralización de datos relacionados con la movilidad. Su principal objetivo es recopilar información de manera anónima sobre diversos elementos involucrados en la movilidad, como señales de tráfico, semáforos, estados de carreteras y vehículos. Este proyecto busca establecer una base de conocimiento (BigData) que sirva para otros proyectos, como la prevención de atascos y avisos de emergencias. Propuesto entonces, el desarrollo de "Alerta Ciclista", una aplicación que advierte a los conductores sobre la presencia de ciclistas en su ruta, utilizando los registros públicos de SmartRoad para detectar posibles encuentros entre vehículos y ciclistas.

2.- Diagramas (Modelo de Datos)

[SmartRoads E-R.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675437/SmartRoads.E-R.pdf)

[SmartRoads Relational.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675454/SmartRoads.Relational.pdf)

El diagrama relacional de SmartRoads muestra las entidades clave y sus relaciones. Incluye:

ActiveElement: Entidades activas en la carretera (señales, semáforos) con atributos como UID, tipo, velocidad y estado.

ChangingElement: Elementos que pueden cambiar de estado, como señales dinámicas, con UID, tipo, estado y ubicación.

PassiveElement: Elementos pasivos (por ejemplo, señales estáticas) identificados por UID, tipo y ubicación.

Spot: Ubicaciones específicas en la carretera vinculadas a elementos activos.

Info: Información asociada a elementos, con IDUID e información detallada.

Administrator: Datos de los administradores del sistema, incluyendo ID, contraseña y nombre de usuario.


Este modelo establece la estructura de datos para la gestión y el seguimiento de los elementos de la carretera en el proyecto SmartRoads.

[SmartRoads UML.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675456/SmartRoads.UML.pdf)


3. Requisitos de Usuario

Descripción General: Resumen de las necesidades de los usuarios.

Requisitos Funcionales: Lista de todas las funcionalidades requeridas.

Requisitos No Funcionales: Aspectos como seguridad, rendimiento y usabilidad.


4. Casos de uso
[SmartRoads Case-Use.pdf](https://github.com/DiegoOrtegaElRincon/SmartRoadsProject/files/13675424/SmartRoads.Case-Use.pdf)

Ciclista: Su función es enviar su ubicación al sistema.

Conductor: Puede recibir notificaciones del sistema.

Administrador: Se encarga de gestionar los datos dentro del sistema.

5. Funcionamiento y Especificaciones Técnicas

Arquitectura del Sistema: Descripción de la estructura técnica.

Componentes Clave: Descripción de las principales partes del sistema.

Flujos de Datos: Cómo se mueven los datos dentro del sistema.

Integraciones: Conexiones con otros sistemas o servicios.

6.

    ActiveElement (UID, Type, Speed, Status)
    ChangingElement (UID, Type, Status, Location)
    PassiveElement (UID, Type, Location)
    Spot (ActiveElement_UID*, Location)
    Info (IDUID*, Information)
    Administrator (ID, Password, Username)



