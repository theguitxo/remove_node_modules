# Eliminar directorios node_modules y .angular

Permite eliminar los directorios node_modules y .angular de un árbol de directorios.

Probado con Node 18.13.0

## Parámetros

El script admite dos parámetros:

* el número de niveles de anidación a listar (por defecto 5)
* si se ha de eliminar el directorio .angular (por defecto sólo elimina node_modules)

## Ejemplos

```
node files.js 6 true
```
Lista 6 niveles de anidación borrando node_modules y .angular

```
node files.js 8
```
Lista 6 niveles de anidación borrando node_modules

```
node files.js true
```
Lista 5 niveles de anidación borrando node_modules y .angular
