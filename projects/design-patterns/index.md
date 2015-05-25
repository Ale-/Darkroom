% CodeUp (III) : Patrones de diseño
% [Ale](414c45.net)
% Hangar, 21 de Mayo 2015

# Patrones de diseño

El concepto de patrón de diseño surge en el entorno de la programación orientada a objetos y proviene de la arquitectura, de las teorías de Christopher Alexander. Los patrones de diseño vienen a ser estrategias de programación pensadas a funcionar a distintas escalas, de lo micro a lo macro. Los primeros en sistematizarlos fueron el conocido como 'Gang of Four' (Gamma, Helm, Johnson y Vissides).

# Básicamente

La función de los patrones es múltiple:

* Hacer el código más reusable y mantenible.
* Crear componentes para una abstracción del lenguaje. Esto facilita la comunicación entre programadores, puede hacer el código comprensible con mayor rapidez y permite la re-apropiación del código con facilidad.
* DRY (_no te repitas a ti mismo_). Dotar de soluciones contrastadas a problemas habituales. 

# Tipos de patrones de diseño

Los patrones de diseño originales se agrupan en tres categorías:

* _Patrones de creación_. Son estrategias de creación e instanciación de objetos.

* _Patrones estructurales_. Son patrones que permiten la estructuración del código y los objetos.

* _Patrones de comportamiento_. Son patrones que tienen que ver con las funcionalidades de los objetos.

Por oposición a los patrones existe también el concepto de anti-patrón. 

# Pero no sólo...

Realmente los patrones de diseño no han parado de crecer y hay multitud de ellos. Lo más importante no es sabérselos todos sino interiorizar sus mecanismos. **Para mí** los dos principios más importantes son los siguientes: 

* _Favorecer la abstracción frente la concreción_. La indirección de la abstracción permite que el código no esté confinado a las intenciones del diseño original y permite la ampliación flexible del código a medida que sea necesario. Las clases sólo pueden extender de manera única, mientras que pueden implementar de manera múltiple.

* _Desacoplar los funcionamientos y estructuras de las cosas_. Favorecer la modularidad.

# Un ejemplo

## 

Vamos a comenzar con un patrón de diseño que no es de los originales, [interfaz de constantes](https://en.wikipedia.org/wiki/Constant_interface). Las interfaces en OOP son clases abstractas puras que delegan en las clases que las implementan el concretar el comportamiento. Las interfaces sólo pueden estar compuestas por métodos abstractos y campos estáticos finales. El patrón en cuestión viene a ser encapsular en una interfaz todas las constantes de una librería o programa. Por ejemplo, processing usa este patrón para encapsular todas sus constantes ([Código fuente de PConstants](https://github.com/processing/processing/blob/master/core/src/processing/core/PConstants.java)). Las clases que quieran usar dichas constantes sólo tendran que implementar dicha interfaz. Este sería un patrón estructural, porque define una manera de ordenar nuestro código.

En este ejemplo tan sencillo vemos las virtudes y mecanismos habituales de un patrón de diseño. Se desacoplan los datos del comportamiento y se usan la indirección y la abstracción. El resultado final es una estructuración más limpia y fácil de mantener...

## Pero... ¿seguro?

También traigo este ejemplo a colación porque hay discusión en torno a el, habiendo opiniones que lo consideran un anti-patrón de diseño, con pocos beneficios respecto a sus desventajas. La alternativa sería crear una clase final normal con un constructor privado que se importa estáticamente. Es decir, ¡tampoco hay que fetichizar la indirección ni la abstracción!

```
final class Constants {
	private Constants() { // restrict instantiation }
	static final double PI = 3.14;
}

import static Constants.PI;
 
public class Calculations {
	void printPi() { println(PI); }
}

```

# Y finalmente

De alguna manera todos los patrones son soluciones basadas en clases. Es decir, no son estrategias abstractas sino que son estrategias que se concretan en clases. Un patrón Iterador necesita de una clase Iterator, un patrón Comando usa una clase Comando, etc. En la OOP todo es un objeto, hasta una estrategia abstracta. 
Vamos a repasar algunos de los patrones originales, para hacernos una idea de cómo funciona todo esto:

# Patrones estructurales

##

Los patrones estructurales tienen que ver las relaciones entre clases dentro de la estructura del código:

## _Decorator_

El patrón __Decorador__ es útil para crear familias de objetos basados unos en otros y es usado, por ejemplo, para la creación de elementos de una interfaz gráfica. Por ejemplo podríamos querer crear un elemento 'Ventana', otro 'Ventana con botón de minimizar', otro 'Ventana con botón de minimizar y barras de scroll', etc. Cada clase añadiría pequeñas variaciones a otras clases del set, es decir, las 'decoraría'. 

## _Facade_

El patrón _Fachada_ es útil para crear una interfaz simple sobre otra compleja, que facilite las interacciones o las haga más cómodas a criterio del programador. Por ejemplo podemos tener una biblioteca de matemáticas muy potente de Java, pero compleja de usar y podríamos programar una interfaz alternativa sobre esta que simplificase nuestras interacciones o que facilitara las más comunes.

## _Adapter_

Un patrón _Adaptador_ intenta resolver las incompatibilidades entre clases que no estuvieron diseñadas para trabajar juntas. Un ejemplo obvio en Processing es el de los vectores. Processing usa por ejemplo la clase PVector y la librería Geomerative usa la clase RVector. Esto hace que haya incompatibilidades entre clases nativas a ambas librerías y que podrían trabajar juntas perfectamente. Una solución es crear una clase 'adaptadora' que resuelva de manera invisible al usuario dicha incompatibilidad.

## _Flyweight_

Este patrón es usado de manera natural sin que nos demos cuenta. Intenta que una familia de objetos comparta tantos datos como le sea posible, reduciendo al mínimo el peso de sus elementos individuales. Se ha usado por ejemplo en editores de texto, donde los objetos serían los caracteres individuales. Si por ejemplo creamos una familia de partículas y una clase gestora con los datos comunes entre ellas, estaríamos usando este patrón de alguna manera. 

# Los patrones de comportamiento

##

Los patrones de comportamiento distribuyen funcionalides y asignan patrones de comunicación entre objetos.

## _Strategy_, _Command_

El patrón _Estrategia_ agrupa algoritmos relacionados de manera que se pueda decidir en tiempo de ejecución cuál se emplea. El patrón _Command_ encapsula un método y le añade un 'meta-comportamiento'. Por ejemplo, se podría emplear para que cada vez que se use un determinado método se mande un mensaje a un registro de eventos o para permitir el clásico Ctrl+Z. Ambos patrones son formalmente parecidos y difíciles de distinguir en la práctica. Las _estrategias_ suelen aceptar argumentos y no tener estado, a diferencia de los _Comandos_. Este tipo de acercamiento (encapsular un método en un objeto) permite el empleo de _callbacks_ en OOP. 

## _Iterator_

El patrón _Iterador_ está pensado para poder recorrer un conjunto de objetos de una manera predeterminada. En la mayoría de lenguajes de programación, los elementos iterables disponen de la instrucción _for each_, que permite de una manera limpia efectuar operaciones sobre un conjunto en la manera deseada por el programador. Java viene ya 'equipado' con un par de clases al efecto, [_Iterable_](https://docs.oracle.com/javase/7/docs/api/java/lang/Iterable.html) e [_Iterator_](https://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html). Los objetos _Iterables_ contienen un _Iterador_, que es el que resuelve el recorrido sobre los elementos. Los objetos _Iterables_ soportan la instrucción _for each_ de Java.

## _Visitor_

El patrón _Visitador_ desacopla el comportamiento de un objeto de su definición, de manera que el comportamiento pueda ser modificado o creado por una clase externa, que lo 'visita'. Esto permite extender de manera limpia la funcionalidad de un objeto a discreción sin necesidad de modificar su código original. Es parecido a la física de la vida real, donde las cosas se mueven más por fuerzas externas que internas --como las solemos programar--.

# Los patrones de creación

##

Son patrones relacionados con la creación de objetos, bien delegando o bien modificando la instanciación habitual de los mismos.

## _Singleton_

Un patrón _Singleton_ impide que una clase se instancie más de una vez en un programa. Para ello hace al constructor de la clase privado, sólo accesible desde un método público que comprueba si ya se ha producido una instanciación de la clase e impidiendo en este caso la generación de un nuevo objeto. Es muy útil en programación concurrente, donde puede ser inseguro que haya más de un objeto de una clase encargada de acceder a un recurso externo (en la web, un fichero, etc.)

## _Factory_

En una _Factoría_ se construyen objetos, de manera que se puedan desacoplar ambas fases. Hay de varios tipos. Una Factoría recibe argumentos que le permiten saber qué tipo de objeto requiere el usuario, si la factoría es normal nos devolverá el objeto deseado. Si es abstracta nos devolverá otra factoría concreta encargada de instanciar dicho objeto, desacoplando todavía más los procesos.   

