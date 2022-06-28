CREATE DATABASE  IF NOT EXISTS `db_magistral` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_magistral`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: db_magistral
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accesorios`
--

DROP TABLE IF EXISTS `accesorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accesorios` (
  `ID_ARTICULO` int NOT NULL,
  `ID_TIPOACCESORIO` tinyint NOT NULL,
  PRIMARY KEY (`ID_ARTICULO`),
  KEY `fk_CALZADO_ARTICULOS1_idx` (`ID_ARTICULO`),
  KEY `fk_ACCESORIOS_TIPOS_ACCESORIOS1_idx` (`ID_TIPOACCESORIO`),
  CONSTRAINT `fk_ACCESORIOS_TIPOS_ACCESORIOS1` FOREIGN KEY (`ID_TIPOACCESORIO`) REFERENCES `tipos_accesorios` (`ID_TIPOACCESORIO`),
  CONSTRAINT `fk_CALZADO_ARTICULOS10` FOREIGN KEY (`ID_ARTICULO`) REFERENCES `articulos` (`ID_ARTICULO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesorios`
--

LOCK TABLES `accesorios` WRITE;
/*!40000 ALTER TABLE `accesorios` DISABLE KEYS */;
INSERT INTO `accesorios` VALUES (27,1),(19,2),(25,4);
/*!40000 ALTER TABLE `accesorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `ID_ARTICULO` int NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(50) NOT NULL,
  `STOCK` int DEFAULT '0',
  `PRECIO_UNIT` decimal(10,2) DEFAULT '0.00',
  `TALLA` varchar(15) NOT NULL,
  `ID_MARCA` tinyint NOT NULL,
  `ID_COLOR` int NOT NULL,
  `ID_LINEA_ARTICULO` tinyint NOT NULL,
  PRIMARY KEY (`ID_ARTICULO`),
  KEY `fk_PRODUCTOS_MARCA1_idx` (`ID_MARCA`),
  KEY `fk_ARTICULOS_COLOR_ARTICULO1_idx` (`ID_COLOR`),
  KEY `FK_PRODUCTOS_LINEA_idx` (`ID_LINEA_ARTICULO`),
  CONSTRAINT `fk_ARTICULOS_COLOR_ARTICULO1` FOREIGN KEY (`ID_COLOR`) REFERENCES `color_articulo` (`ID_COLOR`),
  CONSTRAINT `FK_PRODUCTOS_LINEA` FOREIGN KEY (`ID_LINEA_ARTICULO`) REFERENCES `linea_articulo` (`ID_LINEA_ARTICULO`),
  CONSTRAINT `FK_PRODUCTOS_MARCA` FOREIGN KEY (`ID_MARCA`) REFERENCES `marca` (`ID_MARCA`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (4,'Zapato Casual Air',51,689.32,'8',8,4,1),(7,'Tenis para Running',0,670.87,'7',6,11,4),(9,'Calcetas Algodón',16,87.45,'M',4,5,1),(12,'Calcetas Deportivas',60,450.21,'M',2,5,2),(19,'Bolso de mano tipo Channel',30,950.32,'MEDIANO',7,13,1),(23,'Hoddie Bulls',47,134.54,'M',6,9,2),(24,'Yeezy',25,1400.00,'10.5',5,5,2),(25,'Reloj Digital',6,950.43,'S',5,1,1),(26,'Camisa Casual',17,550.32,'S',8,1,1),(27,'GORRA DEPORTIVA',11,150.32,'M',8,5,2);
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calzado`
--

DROP TABLE IF EXISTS `calzado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calzado` (
  `ID_ARTICULO` int NOT NULL,
  `ID_TIPOCALZADO` tinyint NOT NULL,
  PRIMARY KEY (`ID_ARTICULO`),
  KEY `fk_CALZADO_ARTICULOS1_idx` (`ID_ARTICULO`),
  KEY `fk_CALZADO_TIPOS_CALZADO1_idx` (`ID_TIPOCALZADO`),
  CONSTRAINT `fk_CALZADO_ARTICULOS1` FOREIGN KEY (`ID_ARTICULO`) REFERENCES `articulos` (`ID_ARTICULO`),
  CONSTRAINT `fk_CALZADO_TIPOS_CALZADO1` FOREIGN KEY (`ID_TIPOCALZADO`) REFERENCES `tipos_calzado` (`ID_TIPOCALZADO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calzado`
--

LOCK TABLES `calzado` WRITE;
/*!40000 ALTER TABLE `calzado` DISABLE KEYS */;
INSERT INTO `calzado` VALUES (7,1),(24,1),(4,2);
/*!40000 ALTER TABLE `calzado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_laboral`
--

DROP TABLE IF EXISTS `categoria_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_laboral` (
  `ID_CATEGORIA` tinyint NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_CATEGORIA` varchar(25) DEFAULT NULL,
  `SALARIO` float DEFAULT NULL,
  PRIMARY KEY (`ID_CATEGORIA`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_laboral`
--

LOCK TABLES `categoria_laboral` WRITE;
/*!40000 ALTER TABLE `categoria_laboral` DISABLE KEYS */;
INSERT INTO `categoria_laboral` VALUES (1,'CAJA',12900),(2,'SEGURIDAD',10790),(3,'VENTAS',13000),(4,'DEPENDIENTE',10900),(5,'TI',15390),(6,'GERENCIA',20880);
/*!40000 ALTER TABLE `categoria_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `ID_CIUDAD` int NOT NULL,
  `NOMBRE_CIUDAD` varchar(60) DEFAULT NULL,
  `ID_DEPTO` tinyint NOT NULL,
  PRIMARY KEY (`ID_CIUDAD`,`ID_DEPTO`),
  KEY `FK_CIUDAD_DEPARTAMENTOS` (`ID_DEPTO`),
  CONSTRAINT `FK_CIUDAD_DEPARTAMENTOS` FOREIGN KEY (`ID_DEPTO`) REFERENCES `departamentos` (`ID_DEPTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'La Ceiba',1),(1,'Trujillo',2),(1,'Comayagua',3),(1,'Santa Rosa de Copán',4),(1,'San Pedro Sula',5),(1,'Choluteca',6),(1,'Yuscarán',7),(1,'Distrito Central',8),(1,'Puerto Lempira',9),(1,'La Esperanza',10),(1,'Roatán',11),(1,'La Paz',12),(1,'Gracias',13),(1,'Ocotepeque',14),(1,'Juticalpa',15),(1,'Santa Bárbara',16),(1,'Nacaome',17),(1,'Yoro',18),(2,'Tela',1),(2,'Balfate',2),(2,'Ajuterique',3),(2,'Cabañas',4),(2,'Choloma',5),(2,'Apacilagua',6),(2,'Alauca',7),(2,'Alubarén',8),(2,'Brus Laguna',9),(2,'Camasca',10),(2,'Guanaja',11),(2,'Aguanqueterique',12),(2,'Belén',13),(2,'Belén Gualcho',14),(2,'Campamento',15),(2,'Arada',16),(2,'Alianza',17),(2,'Arenal',18),(3,'Jutiapa',1),(3,'Iriona',2),(3,'El Rosario',3),(3,'Concepción',4),(3,'Omoa',5),(3,'Concepción de María',6),(3,'Danlí',7),(3,'Cedros',8),(3,'Ahuas',9),(3,'Colomoncagua',10),(3,'José Santos Guardiola',11),(3,'Cabañas',12),(3,'Candelaria',13),(3,'Concepción',14),(3,'Catacamas',15),(3,'Atima',16),(3,'Amapala',17),(3,'El Negrito',18),(4,'La Masica',1),(4,'Limón',2),(4,'Esquías',3),(4,'Copán Ruinas',4),(4,'Pimienta',5),(4,'Duyure',6),(4,'El Paraíso',7),(4,'Curarén',8),(4,'Juan Francisco Bulnes',9),(4,'Concepción',10),(4,'Utila',11),(4,'Cane',12),(4,'Cololaca',13),(4,'Dolores Merendón',14),(4,'Concordia',15),(4,'Azacualpa',16),(4,'Aramecina',17),(4,'El Progreso',18),(5,'San Francisco',1),(5,'Sabá',2),(5,'Humuya',3),(5,'Corquín',4),(5,'Potrerillos',5),(5,'El Corpus',6),(5,'Güinope',7),(5,'El Porvenir',8),(5,'Ramón Villeda Morales',9),(5,'Dolores',10),(5,'Chinacla',12),(5,'Erandique',13),(5,'Fraternidad',14),(5,'Dulce Nombre de Culmí',15),(5,'Ceguaca',16),(5,'Caridad',17),(5,'Jocón',18),(6,'Arizona',1),(6,'Santa Fe',2),(6,'La libertad',3),(6,'Cucuyagua',4),(6,'Puerto Cortés',5),(6,'El Triunfo',6),(6,'Jacaleapa',7),(6,'Guaimaca',8),(6,'Wampusirpe',9),(6,'Intibucá',10),(6,'Guajiquiro',12),(6,'Gualcince',13),(6,'La Encarnación',14),(6,'El Rosario',15),(6,'Concepción del Norte',16),(6,'Goascorán',17),(6,'Morazán',18),(7,'Esparta',1),(7,'Santa Rosa de Aguán',2),(7,'Lamaní',3),(7,'Dolores',4),(7,'San Antonio de Cortés',5),(7,'Marcovia',6),(7,'Liure',7),(7,'La Libertad',8),(7,'Jesús de Otoro',10),(7,'Lauterique',12),(7,'Guarita',13),(7,'La Labor',14),(7,'Esquipulas del Norte',15),(7,'Concepción del Sur',16),(7,'Langue',17),(7,'Olanchito',18),(8,'El Porvenir',1),(8,'Sonaguera',2),(8,'La Trinidad',3),(8,'Dulce Nombre',4),(8,'San Francisco de Yojoa',5),(8,'Morolica',6),(8,'Morocelí',7),(8,'La Venta',8),(8,'Magdalena',10),(8,'Marcala',12),(8,'La Campa',13),(8,'Lucerna',14),(8,'Gualaco',15),(8,'Chinda',16),(8,'San Francisco de Coray',17),(8,'Santa Rita',18),(9,'Tocoa',2),(9,'Lejamani',3),(9,'El Paraíso',4),(9,'San Manuel',5),(9,'Namasigue',6),(9,'Oropolí',7),(9,'Lepaterique',8),(9,'Masaguara',10),(9,'Mercedes de Oriente',12),(9,'La Iguala',13),(9,'Mercedes',14),(9,'Guarizama',15),(9,'El Níspero',16),(9,'San Lorenzo',17),(9,'Sulaco',18),(10,'Bonito Oriental',2),(10,'Meambar',3),(10,'Florida',4),(10,'Santa Cruz de Yojoa',5),(10,'Orocuina',6),(10,'Potrerillos',7),(10,'Maraita',8),(10,'San Antonio',10),(10,'Opatoro',12),(10,'Las Flores',13),(10,'San Fernando',14),(10,'Guata',15),(10,'Gualala',16),(10,'Victoria',18),(11,'Minas de Oro',3),(11,'La Jigua',4),(11,'Villanueva',5),(11,'Pespire',6),(11,'San Antonio de Flores',7),(11,'Marale',8),(11,'San Isidro',10),(11,'San Antonio del Norte',12),(11,'La Unión',13),(11,'San Francisco del Valle',14),(11,'Guayape',15),(11,'Ilama',16),(11,'Yorito',18),(12,'Ojos de Agua',3),(12,'La Unión',4),(12,'La Lima',5),(12,'San Antonio de Flores',6),(12,'San Lucas',7),(12,'Nueva Armenia',8),(12,'San Juan',10),(12,'San José',12),(12,'La Virtud',13),(12,'San Jorge',14),(12,'Jano',15),(12,'Las Vegas',16),(13,'San Jerónimo',3),(13,'Nueva Arcadia',4),(13,'San Isidro',6),(13,'San Matías',7),(13,'Ojojona',8),(13,'San Marcos de la Sierra',10),(13,'San Juan',12),(13,'Lepaera',13),(13,'San Marcos',14),(13,'La Unión',15),(13,'Macuelizo',16),(14,'San José de Comayagua',3),(14,'San Agustín',4),(14,'San José',6),(14,'Soledad',7),(14,'Orica',8),(14,'San Miguel Guancapla',10),(14,'San Pedro de Tutule',12),(14,'Mapulaca',13),(14,'Santa Fe',14),(14,'Mangulile',15),(14,'Naranjito',16),(15,'San José del Potrero',3),(15,'San Antonio',4),(15,'San Marcos de Colón',6),(15,'Teupasenti',7),(15,'Reitoca',8),(15,'Santa Lucía',10),(15,'Santa Ana',12),(15,'Piraera',13),(15,'Sensenti',14),(15,'Manto',15),(15,'Nuevo Celilac',16),(16,'San Luis',3),(16,'San Jerónimo',4),(16,'Santa Ana de Yusguare',6),(16,'Texiguat',7),(16,'Sabanagrande',8),(16,'Yamaranguila',10),(16,'Santa Elena',12),(16,'San Andrés',13),(16,'Sinuapa',14),(16,'Salamá',15),(16,'Nueva Frontera',16),(17,'San Sebastián',3),(17,'San José',4),(17,'Vado Ancho',7),(17,'San Antonio de Oriente',8),(17,'San Francisco de Opalaca',10),(17,'Santa María',12),(17,'San Francisco',13),(17,'San Esteban',15),(17,'Petoa',16),(18,'Siguatepeque',3),(18,'San Juan de Opoa',4),(18,'Yauyupe',7),(18,'San Buenaventura',8),(18,'Santiago de Puringla',12),(18,'San Juan Guarita',13),(18,'San Francisco de Becerra',15),(18,'Protección',16),(19,'Villa de San Antonio',3),(19,'San Nicolás',4),(19,'Trojes',7),(19,'San Ignacio',8),(19,'Yarula',12),(19,'San Manuel Colohete',13),(19,'San Francisco de la Paz',15),(19,'Quimistán',16),(20,'Las Lajas',3),(20,'San Pedro',4),(20,'San Juan de Flores',8),(20,'San Rafael',13),(20,'Santa María del Real',15),(20,'San Francisco de Ojuera',16),(21,'Taulabé',3),(21,'Santa Rita',4),(21,'San Miguelito',8),(21,'San Sebastián',13),(21,'Silca',15),(21,'San José de las Colinas',16),(22,'Trinidad de Copán',4),(22,'Santa Ana',8),(22,'Santa Cruz',13),(22,'Yocón',15),(22,'San Luis',16),(23,'Veracruz',4),(23,'Santa Lucía',8),(23,'Talgua',13),(23,'Patuca',15),(23,'San Marcos',16),(24,'Talanga',8),(24,'Tambla',13),(24,'San Nicolás',16),(25,'Tatumbla',8),(25,'Tomalá',13),(25,'San Pedro Zacapa',16),(26,'Valle de Ángeles',8),(26,'Valladolid',13),(26,'San Vicente Centenario',16),(27,'Villa de San Francisco',8),(27,'Virginia',13),(27,'Santa Rita',16),(28,'Vallecillo',8),(28,'San Marcos de Caiquín',13),(28,'Trinidad',16);
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color_articulo`
--

DROP TABLE IF EXISTS `color_articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color_articulo` (
  `ID_COLOR` int NOT NULL AUTO_INCREMENT,
  `DESC_COLOR` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_COLOR`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_articulo`
--

LOCK TABLES `color_articulo` WRITE;
/*!40000 ALTER TABLE `color_articulo` DISABLE KEYS */;
INSERT INTO `color_articulo` VALUES (1,'NEGRO'),(3,'AZUL'),(4,'MARRON'),(5,'GRIS'),(9,'PURPURA'),(11,'BEIGE'),(12,'VERDE MENTA'),(13,'FUSCIA'),(14,'MORADO LILA'),(15,'ROJO VINO'),(16,'ROJO');
/*!40000 ALTER TABLE `color_articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra_articulo`
--

DROP TABLE IF EXISTS `compra_articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra_articulo` (
  `ID_COMPRA` int NOT NULL AUTO_INCREMENT,
  `ID_PROVEEDOR` varchar(14) NOT NULL,
  `FECHA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_COMPRA`),
  KEY `fk_compra_PROVEEDORES1_idx` (`ID_PROVEEDOR`),
  CONSTRAINT `FK_COMPRA_PROVEEDORES` FOREIGN KEY (`ID_PROVEEDOR`) REFERENCES `proveedores` (`ID_PROVEEDOR`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra_articulo`
--

LOCK TABLES `compra_articulo` WRITE;
/*!40000 ALTER TABLE `compra_articulo` DISABLE KEYS */;
INSERT INTO `compra_articulo` VALUES (7,'08052309000924','2022-03-18 04:34:41'),(8,'15019015791239','2022-03-18 04:38:55'),(9,'05019003077924','2022-03-18 04:40:07'),(10,'05019003077924','2022-03-20 01:16:12'),(11,'15019015791239','2022-03-21 15:50:15'),(12,'03092020903230','2022-03-23 17:25:42'),(13,'05019003073434','2022-03-23 17:26:14'),(14,'03092020903230','2022-03-25 17:30:38'),(15,'12012008032323','2022-04-21 00:37:21'),(16,'01093233893203','2022-04-21 14:41:59');
/*!40000 ALTER TABLE `compra_articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra_articulo_detalle`
--

DROP TABLE IF EXISTS `compra_articulo_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra_articulo_detalle` (
  `ID_COMPRA` int NOT NULL,
  `ID_ARTICULO` int NOT NULL,
  `CANTIDAD` int DEFAULT NULL,
  `PRECIO_COMPRA` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_COMPRA`,`ID_ARTICULO`),
  KEY `fk_PRODUCTOS_PROVEEDORES_compra1_idx` (`ID_COMPRA`),
  KEY `FK_PRODUCTOS_PRODUCTOSPROVEEDORES` (`ID_ARTICULO`),
  CONSTRAINT `FK_PRODUCTOS_PRODUCTOSPROVEEDORES` FOREIGN KEY (`ID_ARTICULO`) REFERENCES `articulos` (`ID_ARTICULO`),
  CONSTRAINT `FK_PRODUCTOS_PROVEEDORES_COMPRA` FOREIGN KEY (`ID_COMPRA`) REFERENCES `compra_articulo` (`ID_COMPRA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra_articulo_detalle`
--

LOCK TABLES `compra_articulo_detalle` WRITE;
/*!40000 ALTER TABLE `compra_articulo_detalle` DISABLE KEYS */;
INSERT INTO `compra_articulo_detalle` VALUES (7,9,24,50.32),(7,12,12,250.32),(7,23,48,90.32),(8,24,24,850.32),(9,7,48,350.32),(10,4,12,98.32),(10,19,24,550.43),(10,25,12,78.32),(11,24,12,89.32),(12,12,48,250.43),(12,23,12,97.32),(13,4,48,450.32),(14,19,12,80.32),(14,26,24,220.22),(15,12,12,47.43),(15,24,12,567.43),(16,27,12,70.32);
/*!40000 ALTER TABLE `compra_articulo_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `ID_DEPTO` tinyint NOT NULL AUTO_INCREMENT,
  `NOMBRE_DEPTO` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_DEPTO`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'ATLANTIDA'),(2,'COLON'),(3,'COMAYAGUA'),(4,'COPAN'),(5,'CORTES'),(6,'CHOLUTECA'),(7,'EL PARAISO'),(8,'FRANCISCO MORAZAN'),(9,'GRACIAS A DIOS'),(10,'INTIBUCA'),(11,'ISLAS DE LA BAHIA'),(12,'LA PAZ'),(13,'LEMPIRA'),(14,'OCOTEPEQUE'),(15,'OLANCHO'),(16,'SANTA BARBARA'),(17,'VALLE'),(18,'YORO');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `ID_EMPLEADO` int NOT NULL AUTO_INCREMENT,
  `ID_PERSONA` varchar(13) NOT NULL,
  `ID_CATEGORIA` tinyint NOT NULL,
  `FECHA_CONTRATACION` date NOT NULL,
  PRIMARY KEY (`ID_EMPLEADO`),
  KEY `fk_EMPLEADO_CATEGORIA_LABORAL1_idx` (`ID_CATEGORIA`),
  KEY `FK_EMPLEADO_PERSONA` (`ID_PERSONA`),
  CONSTRAINT `fk_EMPLEADO_CATEGORIA_LABORAL1` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria_laboral` (`ID_CATEGORIA`),
  CONSTRAINT `FK_EMPLEADO_PERSONA` FOREIGN KEY (`ID_PERSONA`) REFERENCES `persona` (`ID_PERSONA`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (5,'1015196700008',4,'2020-11-25'),(6,'0505197000287',1,'2020-12-25'),(7,'0309199500086',3,'2022-02-10'),(9,'0309199900084',5,'2022-01-06'),(12,'0309200012312',2,'2022-01-06'),(13,'0109199800098',2,'2022-02-04'),(15,'0301199800089',3,'2022-01-07'),(16,'0303199800002',6,'2022-02-11'),(17,'1201199800009',1,'2021-12-10'),(18,'0301200000098',4,'2022-02-11');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `ID_FACTURA` int NOT NULL AUTO_INCREMENT,
  `ID_EMPLEADO` int NOT NULL,
  `ID_PERSONA` varchar(13) NOT NULL,
  `ID_MODOPAGO` tinyint NOT NULL,
  `FECHA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_FACTURA`),
  KEY `FK_FACTURA_MODO_PAGO_idx` (`ID_MODOPAGO`),
  KEY `FK_FACTURA_EMPLEADO_idx` (`ID_EMPLEADO`),
  KEY `fk_FACTURA_PERSONA1_idx` (`ID_PERSONA`),
  CONSTRAINT `FK_FACTURA_EMPLEADO` FOREIGN KEY (`ID_EMPLEADO`) REFERENCES `empleado` (`ID_EMPLEADO`),
  CONSTRAINT `FK_FACTURA_MODO_PAGO` FOREIGN KEY (`ID_MODOPAGO`) REFERENCES `modo_pago` (`ID_MODOPAGO`),
  CONSTRAINT `fk_FACTURA_PERSONA1` FOREIGN KEY (`ID_PERSONA`) REFERENCES `persona` (`ID_PERSONA`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,7,'0309200600012',1,'2022-03-19 17:37:04'),(3,7,'0301199612398',1,'2022-03-19 17:40:53'),(4,7,'0309198700105',1,'2022-03-19 17:42:34'),(5,7,'0309200600012',2,'2022-03-20 22:38:18'),(6,7,'0301199612398',2,'2022-03-20 22:39:26'),(7,7,'0309200600012',2,'2022-03-21 15:49:43'),(8,7,'0309199900084',1,'2022-03-21 15:51:16'),(9,7,'0309200600012',2,'2022-03-22 03:13:27'),(10,9,'0309200600012',1,'2022-03-22 03:24:01'),(11,9,'0102200100098',1,'2022-03-23 17:27:36'),(12,9,'0309198700105',2,'2022-03-23 17:32:08'),(13,16,'0309196200032',2,'2022-03-23 21:36:48'),(14,16,'0309200000009',2,'2022-03-23 21:41:05'),(15,18,'0301199900002',2,'2022-03-25 17:25:17'),(16,9,'0309200600012',1,'2022-03-27 00:02:28'),(17,9,'0309200600012',1,'2022-03-27 00:04:46'),(18,9,'0309200600012',1,'2022-03-27 00:07:35'),(19,9,'0309200600012',1,'2022-03-27 00:09:24'),(20,9,'0102200100098',1,'2022-03-27 00:19:34'),(21,9,'0309199500086',1,'2022-03-27 00:21:44'),(22,9,'0309200600012',1,'2022-03-27 00:29:23'),(23,9,'0309199500086',1,'2022-03-27 00:31:15'),(24,9,'0309200600012',1,'2022-03-27 00:40:24'),(25,9,'0309200600012',1,'2022-03-27 00:41:27'),(26,9,'0309200600012',1,'2022-03-27 00:44:36'),(27,9,'0309200600012',1,'2022-03-27 00:47:07'),(28,9,'0309200600012',1,'2022-03-27 00:51:45'),(29,9,'0309200600012',1,'2022-03-27 00:53:46'),(30,9,'0309200600012',1,'2022-03-27 01:01:35'),(31,9,'0309200600012',1,'2022-03-27 01:01:43'),(32,9,'0309200600012',1,'2022-03-27 01:02:00'),(33,9,'0309200600012',1,'2022-03-27 01:10:16'),(34,9,'0309200600012',1,'2022-03-27 01:11:44'),(35,9,'0309199500086',1,'2022-03-27 01:15:05'),(36,9,'0309200600012',1,'2022-03-27 01:16:20'),(37,9,'0309200600012',1,'2022-03-27 01:18:05'),(38,9,'0309200600012',1,'2022-03-27 01:19:01'),(39,9,'0309200600012',1,'2022-03-27 01:22:08'),(40,9,'0102200100098',2,'2022-03-27 03:39:45'),(41,9,'0309198700105',1,'2022-03-27 03:43:49'),(42,9,'0309198700105',1,'2022-03-27 03:44:51'),(43,9,'0309198700105',1,'2022-03-27 03:47:01'),(44,9,'0309200600012',1,'2022-03-27 03:51:05'),(45,9,'0309200600012',1,'2022-03-27 03:55:19'),(46,9,'0309200600012',1,'2022-03-27 03:56:35'),(47,9,'0309200600012',1,'2022-03-27 03:57:29'),(48,9,'0309200600012',1,'2022-03-27 04:14:27'),(49,9,'0309200600012',1,'2022-03-27 04:16:31'),(50,18,'0309200000009',1,'2022-03-27 05:34:32'),(51,9,'0301200000001',1,'2022-04-21 00:39:43'),(52,9,'0102200100098',1,'2022-04-21 14:43:32');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura_detalle`
--

DROP TABLE IF EXISTS `factura_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura_detalle` (
  `ID_FACTURA` int NOT NULL,
  `ID_ARTICULO` int NOT NULL,
  `CANTIDAD` int DEFAULT NULL,
  `PRECIO_UNIT` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_FACTURA`,`ID_ARTICULO`),
  KEY `FK_FACTURA_DETALLE_PRODUCTOS_idx` (`ID_ARTICULO`),
  CONSTRAINT `FK_FACTURA_DETALLE_FACTURA` FOREIGN KEY (`ID_FACTURA`) REFERENCES `factura` (`ID_FACTURA`),
  CONSTRAINT `FK_FACTURA_DETALLE_PRODUCTOS` FOREIGN KEY (`ID_ARTICULO`) REFERENCES `articulos` (`ID_ARTICULO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura_detalle`
--

LOCK TABLES `factura_detalle` WRITE;
/*!40000 ALTER TABLE `factura_detalle` DISABLE KEYS */;
INSERT INTO `factura_detalle` VALUES (1,7,1,670.87),(3,9,4,87.45),(3,23,1,134.54),(3,24,1,1400.00),(4,7,10,670.87),(4,23,12,134.54),(5,9,2,87.45),(6,7,2,670.87),(6,19,1,950.32),(6,25,1,950.43),(7,4,1,689.32),(7,24,2,1400.00),(8,9,1,87.45),(8,25,2,950.43),(9,24,1,1400.00),(10,7,5,670.87),(11,24,2,1400.00),(12,4,1,689.32),(12,19,2,950.32),(13,7,2,670.87),(13,9,1,87.45),(14,19,2,950.32),(15,7,2,670.87),(15,24,1,1400.00),(16,7,12,670.87),(17,7,2,670.87),(17,24,6,1400.00),(18,7,2,670.87),(19,24,2,1400.00),(20,4,2,689.32),(20,19,1,950.32),(21,7,2,670.87),(21,24,1,1400.00),(22,7,1,670.87),(23,24,1,1400.00),(24,12,1,450.21),(25,7,1,670.87),(26,24,1,1400.00),(27,7,6,670.87),(27,12,1,450.21),(28,12,2,450.21),(29,7,1,670.87),(29,24,1,1400.00),(30,12,1,450.21),(31,12,1,450.21),(32,12,1,450.21),(33,7,1,670.87),(34,7,1,670.87),(35,4,1,689.32),(36,4,1,689.32),(37,4,1,689.32),(37,7,1,670.87),(38,4,1,689.32),(39,4,1,689.32),(40,25,3,950.43),(41,26,2,550.32),(42,24,2,1400.00),(43,24,2,1400.00),(43,26,1,550.32),(44,7,2,670.87),(45,12,1,450.21),(45,26,1,550.32),(46,7,2,670.87),(47,26,3,550.32),(48,12,4,450.21),(49,7,2,670.87),(50,7,1,670.87),(50,24,2,1400.00),(51,7,1,670.87),(51,24,1,1400.00),(52,24,1,1400.00),(52,27,1,150.32);
/*!40000 ALTER TABLE `factura_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linea_articulo`
--

DROP TABLE IF EXISTS `linea_articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea_articulo` (
  `ID_LINEA_ARTICULO` tinyint NOT NULL AUTO_INCREMENT,
  `DESC_LINEA` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID_LINEA_ARTICULO`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linea_articulo`
--

LOCK TABLES `linea_articulo` WRITE;
/*!40000 ALTER TABLE `linea_articulo` DISABLE KEYS */;
INSERT INTO `linea_articulo` VALUES (1,'MUJER'),(2,'HOMBRE'),(3,'NIÑOS'),(4,'NIÑAS');
/*!40000 ALTER TABLE `linea_articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `ID_MARCA` tinyint NOT NULL AUTO_INCREMENT,
  `NOMBRE_MARCA` varchar(15) NOT NULL,
  PRIMARY KEY (`ID_MARCA`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (2,'PEPE'),(3,'GILDAN'),(4,'PACER'),(5,'ADIDAS'),(6,'NIKE'),(7,'CHANNEL'),(8,'LACOSTE'),(9,'GINO FERRETI');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modo_pago`
--

DROP TABLE IF EXISTS `modo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modo_pago` (
  `ID_MODOPAGO` tinyint NOT NULL AUTO_INCREMENT,
  `DESC_MODOPAGO` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ID_MODOPAGO`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modo_pago`
--

LOCK TABLES `modo_pago` WRITE;
/*!40000 ALTER TABLE `modo_pago` DISABLE KEYS */;
INSERT INTO `modo_pago` VALUES (1,'EFECTIVO'),(2,'TARJETA');
/*!40000 ALTER TABLE `modo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `ID_PERSONA` varchar(13) NOT NULL,
  `NOMBRE_PERSONA` varchar(50) DEFAULT NULL,
  `APELLIDO_PERSONA` varchar(50) DEFAULT NULL,
  `SEXO` tinyint DEFAULT NULL,
  `CELULAR` varchar(8) DEFAULT NULL,
  `DIRECCION_RESIDENCIA` varchar(200) DEFAULT NULL,
  `ID_CIUDAD` int NOT NULL,
  `ID_DEPTO` tinyint NOT NULL,
  PRIMARY KEY (`ID_PERSONA`),
  KEY `FK_PERSONA_CIUDAD_idx` (`ID_CIUDAD`,`ID_DEPTO`),
  CONSTRAINT `FK_PERSONA_CIUDAD` FOREIGN KEY (`ID_CIUDAD`, `ID_DEPTO`) REFERENCES `ciudad` (`ID_CIUDAD`, `ID_DEPTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES ('0102200100098','CARMEN SUYAPA','LARA FIGUEROA',1,'98787867','Barrio Las Acacias',7,1),('0109199800098','WENDY ','M. WIGGINS',1,'27728938','Direccion Cancha Futbolito',1,8),('0109200000090','CARMEN','MENDEZ',0,'33456789','Barrio La Cruz',9,3),('0301199612398','MARIA FERNANDA','MARTINEZ LARA',1,'98765434','Barrrio Los Almendros',1,8),('0301199800089','JAVIER A.','VALENZUELA VELÁSQUEZ',0,'33454565','Barrio Joyas',1,15),('0301199900002','CARLOS','CERNA',0,'97828993','Barrio Las Acacias',8,6),('0301200000001','OLIVIA','MARTINEZ ',1,'34556737','Barrio Arriba',13,13),('0301200000098','CARLOS ERNESTO','RÍOS AGÜERO',0,'98878673','Barrio Arriba',1,3),('0303199800002','YINA JARISSEL','RIVERA MEJÍA',1,'90988898','Barrio Arriba',1,3),('0309196200032','JOSE LUIS','MARTINEZ',0,'88148614','Barrio La Cruz',9,3),('0309198700105','RAUL ANTONIO','MIRANDA PEREZ',0,'98786765','Bo. Maria',2,10),('0309199500086','EMMIE MARIA','RECARTE LOPEZ',1,'97828221','Barrio La Cruz',9,3),('0309199900084','CRISTHIAN JOSUE','MARTINEZ LARA',0,'97828221','Barrio La Cruz',9,3),('0309200000009','ANAHI PAOLA','MEJIA RIVERA',1,'97890099','Frente a Ferretería Almodovar',8,2),('0309200012312','RUDY ','P. CARRIER',0,'81388393','Barrio La Joya',15,14),('0309200600012','ANGEL GABRIEL','MARTINEZ LARA',0,'33223322','Barrio Arriba',7,3),('0505197000287','ADRIANA JACKELINE','HERNANDEZ AMAYA',1,'99987867','Bo. Kolh',1,5),('1015196700008','AIDA GUADALUPE','UMANZOR MENDIETA',1,'99083782','Bo. San Antonio',1,14),('1201199800009','ROLANDO MIGUEL','MEJÍA MEDINA ',0,'97790999','Barrio San Antonio',1,12);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `ID_PROVEEDOR` varchar(14) NOT NULL,
  `NOMBRE_PROVEEDOR` varchar(50) DEFAULT NULL,
  `EMAIL_PROVEEDOR` varchar(45) DEFAULT NULL,
  `CEL_PROVEEDOR` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`ID_PROVEEDOR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES ('01052309001212','DISTRIBUIDORA LOPEZ','lopez@gmail.com','27893829'),('01092000932323','ZARA TEXTILES','contactzara@textiles.es','28932039'),('01093233893203','ODORIT DISTRO','odorit@gmail.com','27830903'),('03092020903230','AMAZON BUSSINES','contacto@amazon.com','27732890'),('05019003073434','NIKE CENTRO AMERICA','contact@nike.com','27333333'),('05019003077924','DISTRIBUIDORA MEJIA','contacto@dm.hn','99678757'),('08052309000924','PEPE HONDURAS','contactohn@pepe.com','27728987'),('12012008032323','TIENDAS ROSSY','rossy@gmail.com','27738983'),('15019015791239','ADIDAS C.A. S.A.','ca_contact@adidas.com','27721298');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_users`
--

DROP TABLE IF EXISTS `rol_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_users` (
  `ID_ROL` tinyint NOT NULL AUTO_INCREMENT,
  `DESC_ROL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID_ROL`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_users`
--

LOCK TABLES `rol_users` WRITE;
/*!40000 ALTER TABLE `rol_users` DISABLE KEYS */;
INSERT INTO `rol_users` VALUES (1,'ADMINISTRADOR'),(2,'EDITOR'),(3,'AUTOR'),(4,'DISEÑADOR');
/*!40000 ALTER TABLE `rol_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ropa`
--

DROP TABLE IF EXISTS `ropa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ropa` (
  `ID_ARTICULO` int NOT NULL,
  `ID_TIPOSROPA` tinyint NOT NULL,
  PRIMARY KEY (`ID_ARTICULO`),
  KEY `fk_ROPA_TIPOS_ROPA1_idx` (`ID_TIPOSROPA`),
  KEY `fk_ROPA_ARTICULOS1_idx` (`ID_ARTICULO`),
  CONSTRAINT `fk_ROPA_ARTICULOS1` FOREIGN KEY (`ID_ARTICULO`) REFERENCES `articulos` (`ID_ARTICULO`),
  CONSTRAINT `fk_ROPA_TIPOS_ROPA1` FOREIGN KEY (`ID_TIPOSROPA`) REFERENCES `tipos_ropa` (`ID_TIPOSROPA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ropa`
--

LOCK TABLES `ropa` WRITE;
/*!40000 ALTER TABLE `ropa` DISABLE KEYS */;
INSERT INTO `ropa` VALUES (9,4),(12,4),(23,8),(26,13);
/*!40000 ALTER TABLE `ropa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2oPg0nWuOFxX8nhEwKOx2dmqAmB_9mR4',1650589096,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('5o-qJP-OeNlSWwxArcS534x5F7q5qWvi',1650590003,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('6msu772fQhYMWZzC6NbUXONthL8wcN_Z',1650587550,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('7R29hZnJyJEARWQ8y8xGg6bBMDpD3qfc',1650639268,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('LMQfMzEYSQEEzn7YjgNnGf2TQ5tUUH4A',1652829042,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('Li5_aY6vSjNkSOcNL9UrSqKqvZoTsQXx',1650638869,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('VCC03a3E6RHByb10zDvlvWg0gKbuD3YI',1650637623,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('YxzxXBysdfH6IYh2C4clmqsbVjK309FI',1650588046,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('bqXsLdUkEWZmlutp3fv4HbT8SKjuGmOz',1650590200,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('cb8h4vY9rJOBdRn3HbhPSrLK5LQyXFwE',1650640232,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('rbGFHoqy1OxQS6m84FK9YwDmTMeWoyPH',1652829123,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('zTGp9N177WVQcpCcIek1yNicOPvemTEW',1652832605,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_accesorios`
--

DROP TABLE IF EXISTS `tipos_accesorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_accesorios` (
  `ID_TIPOACCESORIO` tinyint NOT NULL AUTO_INCREMENT,
  `DESC_TIPOACCESORIO` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_TIPOACCESORIO`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_accesorios`
--

LOCK TABLES `tipos_accesorios` WRITE;
/*!40000 ALTER TABLE `tipos_accesorios` DISABLE KEYS */;
INSERT INTO `tipos_accesorios` VALUES (1,'GORRA'),(2,'BOLSO'),(3,'MOCHILA'),(4,'JOYAS');
/*!40000 ALTER TABLE `tipos_accesorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_calzado`
--

DROP TABLE IF EXISTS `tipos_calzado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_calzado` (
  `ID_TIPOCALZADO` tinyint NOT NULL AUTO_INCREMENT,
  `DESC_TIPOCALZADO` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_TIPOCALZADO`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_calzado`
--

LOCK TABLES `tipos_calzado` WRITE;
/*!40000 ALTER TABLE `tipos_calzado` DISABLE KEYS */;
INSERT INTO `tipos_calzado` VALUES (1,'DEPORTIVO'),(2,'CASUAL'),(3,'SANDALIAS'),(4,'BOTAS'),(5,'AVENTURA');
/*!40000 ALTER TABLE `tipos_calzado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_ropa`
--

DROP TABLE IF EXISTS `tipos_ropa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_ropa` (
  `ID_TIPOSROPA` tinyint NOT NULL AUTO_INCREMENT,
  `DESC_TIPOSROPA` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_TIPOSROPA`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_ropa`
--

LOCK TABLES `tipos_ropa` WRITE;
/*!40000 ALTER TABLE `tipos_ropa` DISABLE KEYS */;
INSERT INTO `tipos_ropa` VALUES (2,'PANTALON'),(3,'INTERIOR'),(4,'CALCETAS'),(8,'SUDADERA'),(13,'CAMISA');
/*!40000 ALTER TABLE `tipos_ropa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `USERNAME` varchar(16) NOT NULL,
  `ID_EMPLEADO` int NOT NULL,
  `PASSWORD` varchar(60) NOT NULL,
  `ID_ROL` tinyint NOT NULL,
  PRIMARY KEY (`USERNAME`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`),
  KEY `FK_USUARIO_EMPLEADO` (`ID_EMPLEADO`),
  KEY `FK_USUARIO_ROL_USERS` (`ID_ROL`),
  CONSTRAINT `FK_USUARIO_EMPLEADO` FOREIGN KEY (`ID_EMPLEADO`) REFERENCES `empleado` (`ID_EMPLEADO`),
  CONSTRAINT `FK_USUARIO_ROL_USERS` FOREIGN KEY (`ID_ROL`) REFERENCES `rol_users` (`ID_ROL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('adria.amaya',6,'$2a$10$/fxiwbace3c6/4iUl3.z6.l833GRwkpy11Tx43GXXvhqj4NosTXZO',3),('aida.umanzor',5,'$2a$10$WQaqIsS/M0dWnO7sK4LGCOzbRvG2pmF.04BrDi8IEdFRgAfGhfE3W',3),('carlos.rios',18,'$2a$10$e1hfyTvHSzYYSkgPipelSOufeR7lsiQkdaKJeqB9HdOoFNdMupK0.',3),('chris.martinez',9,'$2a$10$/ZOgjFvkHvY2qd4BjhVf1.PuOd922w.AXf3S1RA5YwIncjqJqNG2C',1),('emmie.recarte',7,'$2a$10$rAb6.lLLJMuTBL9rLx2Ht.3mG/VVveSV6Mdmwe2CqWdio2IIgQYo6',2),('javier.velasquez',15,'$2a$10$W0IiQNoRVWNmTCxBMnKhyOaZgSSjkeYfiTZjPFWzI6Brawjtce7/u',2),('rolando.mejia',17,'$2a$10$c2WN0vJ7OFR8oUusM4qsQOwBLW5RS5i04OtF85RRyGnntXXPH8V42',3),('yina.rivera',16,'$2a$10$k9s1nPA.JVXsYifrLAF2b.XcVYgENLPQH.CAlMr0CtrehvQ1cNqV2',4);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-23  9:00:58
