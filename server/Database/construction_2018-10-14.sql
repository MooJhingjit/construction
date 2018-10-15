# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: construction
# Generation Time: 2018-10-14 09:57:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table contract
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract`;

CREATE TABLE `contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `project_id` int(11) NOT NULL,
  `contract_type` varchar(30) NOT NULL,
  `plan` varchar(45) NOT NULL,
  `house_id` varchar(100) NOT NULL,
  `price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `date_start` date DEFAULT NULL,
  `paid` decimal(15,2) DEFAULT NULL,
  `status` enum('wait','ip','done') NOT NULL DEFAULT 'wait',
  `assign` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table contract_preiod
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract_preiod`;

CREATE TABLE `contract_preiod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `house_id` varchar(100) NOT NULL,
  `time` tinyint(2) NOT NULL,
  `preiod` tinyint(3) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `contract_preiod` WRITE;
/*!40000 ALTER TABLE `contract_preiod` DISABLE KEYS */;

INSERT INTO `contract_preiod` (`id`, `house_id`, `time`, `preiod`, `created_at`)
VALUES
	(11,'198PWY',1,17,'2018-05-23 23:32:14'),
	(12,'198PWY',2,12,'2018-05-23 23:32:14'),
	(13,'198PWY',3,13,'2018-05-23 23:32:14'),
	(14,'198PWY',4,12,'2018-05-23 23:32:14'),
	(15,'198PWY',5,12,'2018-05-23 23:32:14'),
	(16,'198PWY',6,15,'2018-05-23 23:32:14'),
	(17,'198PWY',7,15,'2018-05-23 23:32:14'),
	(18,'198PWY',8,25,'2018-05-23 23:32:14'),
	(19,'198PWY',9,12,'2018-05-23 23:32:14'),
	(20,'198PWY',10,15,'2018-05-23 23:32:14'),
	(21,'119PWY',1,15,'2018-05-23 23:32:14'),
	(22,'119PWY',2,10,'2018-05-23 23:32:14'),
	(23,'119PWY',3,10,'2018-05-23 23:32:14'),
	(24,'119PWY',4,10,'2018-05-23 23:32:14'),
	(25,'119PWY',5,10,'2018-05-23 23:32:14'),
	(26,'119PWY',6,10,'2018-05-23 23:32:14'),
	(27,'119PWY',7,8,'2018-05-23 23:32:14'),
	(28,'119PWY',8,10,'2018-05-23 23:32:14'),
	(29,'119PWY',9,7,'2018-05-23 23:32:14'),
	(30,'119PWY',10,15,'2018-05-23 23:32:14'),
	(41,'169PWY',1,17,'2018-05-23 23:32:14'),
	(42,'169PWY',2,12,'2018-05-23 23:32:14'),
	(43,'169PWY',3,13,'2018-05-23 23:32:14'),
	(44,'169PWY',4,12,'2018-05-23 23:32:14'),
	(45,'169PWY',5,12,'2018-05-23 23:32:14'),
	(46,'169PWY',6,15,'2018-05-23 23:32:14'),
	(47,'169PWY',7,15,'2018-05-23 23:32:14'),
	(48,'169PWY',8,25,'2018-05-23 23:32:14'),
	(49,'169PWY',9,12,'2018-05-23 23:32:14'),
	(50,'169PWY',10,15,'2018-05-23 23:32:14'),
	(51,'237PWY',1,20,'2018-05-23 23:32:14'),
	(52,'237PWY',2,15,'2018-05-23 23:32:14'),
	(53,'237PWY',3,15,'2018-05-23 23:32:14'),
	(54,'237PWY',4,15,'2018-05-23 23:32:14'),
	(55,'237PWY',5,14,'2018-05-23 23:32:14'),
	(56,'237PWY',6,16,'2018-05-23 23:32:14'),
	(57,'237PWY',7,18,'2018-05-23 23:32:14'),
	(58,'237PWY',8,25,'2018-05-23 23:32:14'),
	(59,'237PWY',9,12,'2018-05-23 23:32:14'),
	(60,'237PWY',10,15,'2018-05-23 23:32:14'),
	(61,'105PWY',1,10,'2018-05-23 23:32:14'),
	(62,'105PWY',2,8,'2018-05-23 23:32:14'),
	(63,'105PWY',3,10,'2018-05-23 23:32:14'),
	(64,'105PWY',4,10,'2018-05-23 23:32:14'),
	(65,'105PWY',5,8,'2018-05-23 23:32:14'),
	(66,'105PWY',6,9,'2018-05-23 23:32:14'),
	(67,'105PWY',7,8,'2018-05-23 23:32:14'),
	(68,'105PWY',8,10,'2018-05-23 23:32:14'),
	(69,'105PWY',9,7,'2018-05-23 23:32:14'),
	(70,'105PWY',10,10,'2018-05-23 23:32:14'),
	(72,'142PWY',1,15,'2018-05-23 23:32:14'),
	(73,'142PWY',2,10,'2018-05-23 23:32:14'),
	(74,'142PWY',3,10,'2018-05-23 23:32:14'),
	(75,'142PWY',4,12,'2018-05-23 23:32:14'),
	(76,'142PWY',5,12,'2018-05-23 23:32:14'),
	(77,'142PWY',6,12,'2018-05-23 23:32:14'),
	(78,'142PWY',7,12,'2018-05-23 23:32:14'),
	(79,'142PWY',8,12,'2018-05-23 23:32:14'),
	(80,'142PWY',9,10,'2018-05-23 23:32:14'),
	(81,'142PWY',10,15,'2018-05-23 23:32:14');

/*!40000 ALTER TABLE `contract_preiod` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contract_progress
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract_progress`;

CREATE TABLE `contract_progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_code` varchar(45) NOT NULL,
  `time` tinyint(2) NOT NULL,
  `order` tinyint(2) NOT NULL,
  `order_all` tinyint(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `real_date` date DEFAULT NULL,
  `delay` int(6) NOT NULL,
  `condition` tinyint(3) DEFAULT NULL,
  `status` enum('pending','wait','ip','done') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `contract_progresscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table contract_times
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract_times`;

CREATE TABLE `contract_times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_code` varchar(45) NOT NULL,
  `time` tinyint(2) NOT NULL DEFAULT '0',
  `price` decimal(15,2) DEFAULT '0.00',
  `is_success` tinyint(1) NOT NULL DEFAULT '0',
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table house
# ------------------------------------------------------------

DROP TABLE IF EXISTS `house`;

CREATE TABLE `house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `tile` varchar(50) DEFAULT NULL,
  `garage` enum('none','left','right') DEFAULT NULL,
  `stair` enum('none','left','right') DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;

INSERT INTO `house` (`id`, `plan`, `name`, `type`, `tile`, `garage`, `stair`, `color`, `created_at`)
VALUES
	(1,'MO5-00N01','142PWY22T',1,'142PW-2','left','left','B3PW1','2018-08-30 13:42:10'),
	(2,'MO5-00O08','105PWY22F',1,'105PW-1','left','left','B3PW2','2018-08-30 13:41:52'),
	(3,'MO5-00O11','105PWY22F',1,'105PW-1','left','left','B3PW3','2018-08-30 13:41:37'),
	(4,'MO5-00O12','105PWY22F',1,'105PW-3','left','left','B3PW1','2018-08-30 13:41:20'),
	(5,'MO5-00N15','142PWY22T',1,'142PW-1','left','left','B3PW3','2018-08-30 13:41:03'),
	(6,'MO5-00N18','198PWY32T',1,'198PW-1R1','left','left','B3PW3','2018-08-30 13:40:49'),
	(7,'MO5-00A01','142PWY22T',1,'142PW-1','right','right','B3PW1','2018-08-30 13:40:28'),
	(8,'MO5-00A03','169PWY22T',1,'169PW-2R1','left','left','B3PW2','2018-08-30 13:40:15'),
	(9,'MO5-00A02','119PWY22T',1,'119PW-1R1','left','left','B3PW3','2018-08-30 13:39:57'),
	(10,'MO5-00M08','169PWY22T',1,'169PW-1R1','right','right','B3PW3','2018-08-30 13:39:17'),
	(11,'MO5-00M09','198PWY32T',1,'198PW-1R1','right','right','B3PW1','2018-08-30 13:38:51'),
	(12,'MO5-00M01','237PW132T',1,'237PW2R2','left','left','B3PW1','2018-08-30 13:38:29'),
	(13,'MO5-00A12','237PW132T',1,'237PW1R2','left','left','B3PW3','2018-08-30 13:38:06'),
	(14,'MO5-00Q05','105PWY22F',1,'105PW-1R1','right','right','B3PW2','2018-08-30 13:37:31'),
	(15,'MO5-00M08','169PWY22T',1,'169PW-1R1','right','right','B3PW3','2018-09-27 07:49:30'),
	(16,'MO5-00M09','198PWY32T',1,'198PW-1R1','right','right','B3PW1','2018-09-27 07:51:01'),
	(17,'MO5-00M01','237PW132T',1,'237PW2R2','left','left','B3PW1','2018-09-27 07:53:26'),
	(18,'MO5-00A12','237PW132T',1,'237PW1R2','left','left','B3PW3','2018-09-27 07:54:22'),
	(19,'MO5-00Q05','105PWY22F',1,'105PW-1R1','right','right','B3PW2','2018-09-27 07:55:25'),
	(20,'MO5-00M16','169PWY22T',1,'169PW-1R2','left','left','B3PW1','2018-09-27 07:59:42'),
	(21,'MO5-00N09','119PWY22T',1,'119PW-2R2','right','right','B3PW1','2018-09-27 08:00:46'),
	(22,'MO5-00N10','119PWY22T',1,'119PW-1R2','right','right','B3PW3','2018-09-27 08:01:38'),
	(23,'MO5-00O03','119PWY22T',1,'119PW-1R2','right','right','B3PW2','2018-09-27 08:02:23'),
	(24,'MO5-00P14','142PWY22T',1,'142PW-1R1','right','right','B3PW2','2018-09-27 08:03:08'),
	(25,'MO5-00P08','119PW223T',1,'119PW-4','left','left','B4PW1','2018-09-27 08:04:10'),
	(26,'MO5-00P13','119PW223T',1,'119PW-4','left','left','B4PW1','2018-09-27 08:05:03'),
	(27,'MO5-00Q08','142PWY22T',1,'142PW-2R1','left','left','B3PW1','2018-09-27 08:06:03'),
	(28,'MO5-00M15','198PWY32T',1,'198PW-2R2','left','left','B3PW3','2018-09-27 08:12:56'),
	(29,'MO5-00R01','198PWY32T',1,'198PW-2R2','left','left','B3PW3','2018-09-27 08:13:42'),
	(30,'MO5-00L14','106PW223F',1,'106PW2','left','left','B4PW2','2018-09-27 08:14:30'),
	(31,'MO5-00L17','119PW223T',1,'119PW-4','left','left','B4PW1','2018-09-27 08:15:28'),
	(32,'MO5-00L21','150PW223T',1,'150PW-1','right','right','B4PW1','2018-09-27 08:16:14');

/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table material
# ------------------------------------------------------------

DROP TABLE IF EXISTS `material`;

CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `house_id` varchar(100) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `delay` tinyint(3) DEFAULT '0',
  `amount` tinyint(3) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;

INSERT INTO `material` (`id`, `house_id`, `store_id`, `name`, `delay`, `amount`, `unit`, `price`, `created_at`)
VALUES
	(1,'106PW223F',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า400kg/m²) ขนาด 0.35x3.88 m.',15,14,'แผ่น',0.00,'2018-09-27 08:35:40'),
	(2,'106PW223F',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x3.71 m.',15,18,'แผ่น',0.00,'2018-09-27 08:35:40'),
	(3,'106PW223F',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x3.46 m.',15,15,'แผ่น',0.00,'2018-09-27 08:35:40'),
	(4,'106PW223F',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x3.01 m.',15,4,'แผ่น',0.00,'2018-09-27 08:35:40'),
	(5,'106PW223F',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x1.97 m.',15,3,'แผ่น',0.00,'2018-09-27 08:35:40'),
	(6,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²) ขนาด 0.35x3.8 m.',15,14,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(7,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x3.27 m.',15,9,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(8,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x3.13 m.',15,7,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(9,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x3.05 m.',15,12,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(10,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x2.97 m.',15,11,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(11,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x2.47 m.',15,12,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(12,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x1.93 m.',15,14,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(13,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x1.15 m.',15,7,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(14,'150PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²) ขนาด 0.35x1.09 m.',15,10,'แผ่น',0.00,'2018-09-27 08:44:22'),
	(15,'119PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า450kg/m²)  ขนาด 0.35x3.77 m.',15,14,'แผ่น',0.00,'2018-09-27 08:48:25'),
	(16,'119PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²)  ขนาด 0.35x3.83 m.',15,30,'แผ่น',0.00,'2018-09-27 08:48:25'),
	(17,'119PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²)  ขนาด 0.35x3.73 m.',15,2,'แผ่น',0.00,'2018-09-27 08:48:25'),
	(18,'119PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²)  ขนาด 0.35x2.6 m.',15,7,'แผ่น',0.00,'2018-09-27 08:48:25'),
	(19,'119PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²)  ขนาด 0.35x1.5 m.',15,6,'แผ่น',0.00,'2018-09-27 08:48:25'),
	(20,'119PW223T',1,'แผ่นพื้นสำเร็จรูป ชนิด3ขา(LLไม่น้อยกว่า200kg/m²)  ขนาด 0.35x1.23 m.',15,12,'แผ่น',0.00,'2018-09-27 08:48:25');

/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table material_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `material_group`;

CREATE TABLE `material_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `material_group` WRITE;
/*!40000 ALTER TABLE `material_group` DISABLE KEYS */;

INSERT INTO `material_group` (`id`, `name`, `created_at`)
VALUES
	(3,'งวดที่ 1 งานที่ 1','2018-07-20 01:23:56'),
	(4,'งวดที่ 1 งานที่ 2','2018-06-23 15:24:53'),
	(5,'งวดที่ 1 งานที่ 3','2018-07-20 01:24:01'),
	(6,'งวดที่ 1 งานที่ 4','2018-06-23 15:25:10'),
	(8,'งวดที่ 1 งานที่ 5','2018-06-23 16:52:43'),
	(9,'งวดที่ 2 งานที่ 6','2018-07-20 01:24:35'),
	(11,'งวดที่ 2 งานที่ 8','2018-07-20 01:24:40'),
	(12,'งวดที่ 2 งานที่ 9','2018-07-20 01:24:42'),
	(13,'งวดที่ 3 งานที่ 10','2018-07-20 01:24:43'),
	(14,'งวดที่ 3 งานที่ 11','2018-07-20 01:24:44'),
	(15,'งวดที่ 3 งานที่ 12','2018-07-20 01:24:53'),
	(16,'งวดที่ 4 งานที่ 13','2018-07-20 01:24:54'),
	(17,'งวดที่ 4 งานที่ 14','2018-07-20 01:24:56'),
	(18,'งวดที่ 4 งานที่ 15','2018-07-20 01:24:57'),
	(19,'งวดที่ 5 งานที่ 16','2018-07-20 01:24:59'),
	(20,'งวดที่ 5 งานที่ 17','2018-07-20 01:27:04'),
	(21,'งวดที่ 5 งานที่ 18','2018-07-20 01:27:13'),
	(22,'งวดที่ 5 งานที่ 19','2018-07-20 01:27:46'),
	(23,'งวดที่ 6 งานที่ 20','2018-07-20 01:27:47'),
	(24,'งวดที่ 6 งานที่ 21','2018-07-20 01:27:48'),
	(25,'งวดที่ 6 งานที่ 22','2018-07-20 01:27:50'),
	(26,'งวดที่ 6 งานที่ 23','2018-07-20 01:27:52'),
	(27,'งวดที่ 2 งานที่ 7','2018-08-04 11:06:22');

/*!40000 ALTER TABLE `material_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table material_group_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `material_group_detail`;

CREATE TABLE `material_group_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `house_id` varchar(100) DEFAULT NULL,
  `material_id` int(11) NOT NULL,
  `material_group_id` int(11) NOT NULL,
  `amount` tinyint(4) DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table material_quantity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `material_quantity`;

CREATE TABLE `material_quantity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `material_id` int(11) NOT NULL,
  `side` enum('left','right') NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `material_quantity` WRITE;
/*!40000 ALTER TABLE `material_quantity` DISABLE KEYS */;

INSERT INTO `material_quantity` (`id`, `material_id`, `side`, `color`, `price`, `created_at`)
VALUES
	(1173,565,'left','B3PW1',10.00,'2018-06-08 15:02:16'),
	(1174,565,'right','B3PW1',10.00,'2018-06-08 15:02:16'),
	(1175,566,'left','B3PW1',11.00,'2018-06-08 15:02:16'),
	(1176,566,'right','B3PW1',11.00,'2018-06-08 15:02:16'),
	(1240,563,'left','B3PW1',199.00,'2018-06-09 14:59:53'),
	(1241,563,'left','B3PW4',400.00,'2018-06-09 14:59:53'),
	(1242,563,'left','B3PW2',300.00,'2018-06-09 14:59:53'),
	(1243,563,'right','B3PW1',199.00,'2018-06-09 14:59:53'),
	(1244,563,'right','B3PW2',300.00,'2018-06-09 14:59:53'),
	(2267,591,'left','B3PW1',200.00,'2018-07-15 16:48:11'),
	(2268,590,'left','B3PW1',100.00,'2018-07-15 16:48:11'),
	(2269,591,'right','B3PW1',200.00,'2018-07-15 16:48:11'),
	(2270,590,'right','B3PW1',100.00,'2018-07-15 16:48:11');

/*!40000 ALTER TABLE `material_quantity` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ordering
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ordering`;

CREATE TABLE `ordering` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progress_id` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `contract_code` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `amount` tinyint(2) NOT NULL DEFAULT '0',
  `date_start` date DEFAULT NULL,
  `status` enum('pending','wait','confirmed','received') DEFAULT 'wait',
  `order_type` enum('normal','extra') NOT NULL DEFAULT 'normal',
  `note` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table ordering_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ordering_detail`;

CREATE TABLE `ordering_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `unit_text` varchar(50) DEFAULT '',
  `unit_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `amount` tinyint(2) NOT NULL DEFAULT '0',
  `status` enum('wait','received') NOT NULL DEFAULT 'wait',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL,
  `type` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ready','ip','done') NOT NULL DEFAULT 'ready',
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`id`, `code`, `name`, `type`, `created_at`, `status`, `address`)
VALUES
	(4,'LH269','มัณฑนา อ่อนนุช-วงแหวน5','1','2018-08-09 08:00:48','ready',''),
	(5,'LH120','นันทวัน รามอินทรา พหลโยธิน50','2','2018-08-09 08:02:13','ready',''),
	(6,'LH322','มัณฑนา ศรีนครินทร์-ร่มเกล้า','1','2018-08-09 08:03:30','ready',''),
	(7,'LH295','นันทวัน บางนา กม.7','2','2018-08-09 08:05:04','ready','');

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `fax` varchar(45) DEFAULT NULL,
  `tel` varchar(45) NOT NULL,
  `address` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;

INSERT INTO `store` (`id`, `name`, `type`, `contact`, `fax`, `tel`, `address`, `created_at`)
VALUES
	(1,'พีซีเอ็ม คอนสตรัคชั่นแมททีเรียล จำกัด','แผ่นพื้นสำเร็จรูป','คุณหนู','02-9870671','02-9870671','','2018-08-09 08:22:24'),
	(2,'เมโทรโปลิแทน  โปรดักส์  จำกัด','เสาเข็ม','คุณ จวง                  ','02-517-5167','02-517-5167','','2018-08-09 08:21:57'),
	(3,'ควอลิตี้คอนสตรัคชั่นโปรดักส์  จำกัด (มหาชน)','อิฐมวลเบา','คุณ ตาล','035-258948','035-258948','','2018-08-09 08:24:01'),
	(4,'โมเดิร์น เอเวอร์นิว จำกัด','ตะแกรงระบายน้ำ(Modern Drain)','คุณ   แน็ต','02-1304155','02-1304155','','2018-08-09 08:25:36'),
	(5,'SPV','เชิงชาย/ผนังไม้ประดับ/ไม้บัว(CONWOOD)','คุณอุ้ม','02-8962744','02-8962744','','2018-08-09 08:26:45'),
	(6,'กิจศิริ','เชิงชาย/ผนังไม้ประดับ/ไม้บัว(สมาร์ทวูด)','คุณ ริน','02-3931115','02-3931115','','2018-08-09 08:29:43');

/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table technician
# ------------------------------------------------------------

DROP TABLE IF EXISTS `technician`;

CREATE TABLE `technician` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `job_type` tinyint(3) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `technician` WRITE;
/*!40000 ALTER TABLE `technician` DISABLE KEYS */;

INSERT INTO `technician` (`id`, `name`, `phone`, `job_type`, `created_at`)
VALUES
	(2,'ช่างสมพร','0976635465',2,'2018-09-01 12:37:03'),
	(3,'ช่างเอ็ม','0863425364',2,'2018-09-01 12:37:17'),
	(4,'ช่างเอก','0865526354',3,'2018-09-02 16:44:09');

/*!40000 ALTER TABLE `technician` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `position` enum('ADMIN','PURCHASING','TECHNICIAN') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `username`, `password`, `email`, `phone`, `address`, `position`, `created_at`)
VALUES
	(8,'ปกครอง จริงจิตร','pokkrong','$2b$10$hf2.HhHw/JaSgWcu8QquTuN1GA1yfenagDWDItYntrpFDPo2BTFse','pokkrong@gmail.com','012374857','test','ADMIN','2018-07-08 14:38:37'),
	(10,'ฝ่ายจัดซื้อ','purchasing','$2b$10$zGkGre2FOL1pwQDm9SbMWue/nwqklQeMok8ydWj2K3aPYmwaw7NKe','purchasing@gmail.com','0987774653','','PURCHASING','2018-07-16 23:32:09'),
	(11,'หน้างาน','tec','$2b$10$PRHVfZ0mqJx03EfmAWsV9OUxYjtdVcD3uMwfTecJ0uneLjB1/Uha2','technician@gmail.com','0987654321','','TECHNICIAN','2018-07-17 00:53:41'),
	(12,'คมสันต์  คงสุข','komsan','$2b$10$fa7eyigLQS/LQrVg4eYDVumIbQChUVvFu5JGn4uVJB1vJZLAJVmbW','komsan.kongsuk@gmail.com','0869728111','','ADMIN','2018-08-05 21:44:43');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_group`;

CREATE TABLE `work_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `work_group` WRITE;
/*!40000 ALTER TABLE `work_group` DISABLE KEYS */;

INSERT INTO `work_group` (`id`, `name`, `created_at`)
VALUES
	(1,'หมวดงานรั้ว(เหล็ก)','2018-10-05 01:23:49'),
	(2,' หมวดงานรั้ว(สี) ','2018-10-05 01:29:09');

/*!40000 ALTER TABLE `work_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_group_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_group_detail`;

CREATE TABLE `work_group_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `time` tinyint(3) DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  `house_id` varchar(100) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` tinyint(3) DEFAULT '1',
  `unit` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `note` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `work_group_detail` WRITE;
/*!40000 ALTER TABLE `work_group_detail` DISABLE KEYS */;

INSERT INTO `work_group_detail` (`id`, `time`, `group_id`, `house_id`, `name`, `amount`, `unit`, `price`, `note`, `created_at`)
VALUES
	(15,1,1,'198PWY','  งานเหล็กรั้วโปร่ง  ',1,' เมตร ',330.00,'','2018-10-05 01:29:22'),
	(16,3,1,'198PWY','  งานติดตั้งประตูเล็ก (ประตูสำเร็จรูป)  ',1,' ชุด ',800.00,NULL,'2018-10-05 01:29:22'),
	(17,4,1,'198PWY','  งานติดตั้งฝาถังขยะ  ',1,' ชุด ',100.00,NULL,'2018-10-05 01:29:22'),
	(18,5,1,'198PWY',' งานเหล็กประตูใหญ่กรณีเป็นบานคู่(รวมวางราง) ',1,' ชุด ',1000.00,NULL,'2018-10-05 01:29:22'),
	(19,6,1,'198PWY',' ติดตั้งบ้านเลขที่+ตู้จดหมาย ',1,' ชุด ',100.00,NULL,'2018-10-05 01:29:22'),
	(23,1,2,'198PWY','  งานสีประตูเล็ก + ประตูใหญ่ + ชุดถังขยะ  ',1,' ชุด ',850.00,'ทดสอบหมายเหตุ','2018-10-06 00:34:56'),
	(24,2,2,'198PWY','  งานสีรั้วโปร่ง  ',1,' เมตร ',85.00,NULL,'2018-10-06 00:34:56'),
	(25,3,2,'198PWY','  งานสีรั้วทึบ  ',1,' ตร.ม. ',85.00,NULL,'2018-10-06 00:34:56');

/*!40000 ALTER TABLE `work_group_detail` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_order`;

CREATE TABLE `work_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` tinyint(2) NOT NULL,
  `pre_order` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `work_order` WRITE;
/*!40000 ALTER TABLE `work_order` DISABLE KEYS */;

INSERT INTO `work_order` (`id`, `time`, `pre_order`, `created_at`)
VALUES
	(1,1,7,'2018-10-03 00:46:08'),
	(2,2,3,'2018-08-04 10:59:27'),
	(14,3,0,'2018-07-09 00:01:36'),
	(15,4,0,'2018-07-09 00:01:54'),
	(16,5,0,'2018-07-09 00:04:28'),
	(17,6,0,'2018-07-09 00:04:44'),
	(18,7,0,'2018-07-09 00:05:07'),
	(19,8,0,'2018-07-09 00:05:24'),
	(20,9,0,'2018-07-09 00:05:37'),
	(21,10,0,'2018-07-09 00:05:44');

/*!40000 ALTER TABLE `work_order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_order_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_order_detail`;

CREATE TABLE `work_order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `work_order_time` tinyint(2) NOT NULL,
  `order` tinyint(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `post_order` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `work_order_detail` WRITE;
/*!40000 ALTER TABLE `work_order_detail` DISABLE KEYS */;

INSERT INTO `work_order_detail` (`id`, `work_order_time`, `order`, `name`, `post_order`, `created_at`)
VALUES
	(620,3,1,' งานก่ออิฐ 100%',NULL,'2018-07-09 00:01:36'),
	(621,3,3,'งานบัวผนังภายนอก',NULL,'2018-07-09 00:01:36'),
	(622,3,2,'งานฉาบปูน (ไม่รวมผนังในห้องน้ำ)',NULL,'2018-07-09 00:01:36'),
	(623,4,1,' งานผนังห้องน้ำบน-ล่างและเคาน์เตอร์ครัว',NULL,'2018-07-09 00:01:54'),
	(624,4,3,'งานฝ้าภายนอกรอบบน100%',NULL,'2018-07-09 00:01:54'),
	(625,4,2,'งานร้อยสายไฟภายในอาคาร',NULL,'2018-07-09 00:01:54'),
	(646,5,2,' งานโครงฝ้าภายในอาคาร(ชั้นล่าง)',NULL,'2018-07-09 00:04:28'),
	(647,5,4,'สีภายนอกช่วงบน',NULL,'2018-07-09 00:04:28'),
	(648,5,1,' งานโครงฝ้าภายในอาคาร(ชั้นล่าง)',NULL,'2018-07-09 00:04:28'),
	(649,5,3,'งานมุงหลังคารอบล่าง',NULL,'2018-07-09 00:04:28'),
	(650,6,2,' งานบันไดไม้50%(เสา,ราวลูกกรง)',NULL,'2018-07-09 00:04:44'),
	(651,6,4,'งานฝ้าภายนอกรอบล่างทั้งหมด',NULL,'2018-07-09 00:04:44'),
	(652,6,1,'งานหน้าต่างชั้นบน',NULL,'2018-07-09 00:04:44'),
	(653,6,3,'งานท่อภายนอกทั้งหมด',NULL,'2018-07-09 00:04:44'),
	(654,6,5,'งานฝ้าภายใน100%',NULL,'2018-07-09 00:04:44'),
	(655,7,2,'งานสีภายใน รองพื้น แต่งผิว',NULL,'2018-07-09 00:05:07'),
	(656,7,1,' งานสีจริงภายนอกช่วงล่าง80%',NULL,'2018-07-09 00:05:07'),
	(657,7,3,'งานบันไดไม้100%(ลูกนอน+ชานพัก)',NULL,'2018-07-09 00:05:07'),
	(658,7,4,'งานปูพื้นผิวชั้นล่างและห้องน้ำชั้นล่าง',NULL,'2018-07-09 00:05:07'),
	(659,7,5,'งานถนน+ซักล้าง',NULL,'2018-07-09 00:05:07'),
	(660,8,2,' งานไฟฟ้า (อุปกรณ์)',NULL,'2018-07-09 00:05:24'),
	(661,8,1,' ติดตั้งไม้พื้นสำเร็จรูปลามิเนต',NULL,'2018-07-09 00:05:24'),
	(662,8,3,' งานประตู+หน้าต่าง100%',NULL,'2018-07-09 00:05:24'),
	(663,8,4,' งานสุขภัณฑ์และอุปกรณ์',NULL,'2018-07-09 00:05:24'),
	(664,9,2,' *เก็บทำความสะอาด(ส่งงวด9)',NULL,'2018-07-09 00:05:37'),
	(665,9,1,' เก็บงานสีก่อนหมวด 6',NULL,'2018-07-09 00:05:37'),
	(666,10,1,' สั่งจ่ายงวด 10',NULL,'2018-07-09 00:05:44'),
	(720,2,1,'งานเชิงชาย+ผนังไม้สำเร็จรูป',9,'2018-08-04 10:59:27'),
	(721,2,2,' งานหล่อเคาน์เตอร์ครัว',10,'2018-08-04 10:59:27'),
	(722,2,4,'มุงหลังคารอบบน',12,'2018-08-04 10:59:27'),
	(723,2,3,' งานเดินท่อประปาภายในอาคาร',11,'2018-08-04 10:59:27'),
	(803,1,1,'ทำสัญญาก่อสร้าง',3,'2018-10-03 00:46:08'),
	(804,1,2,' ถังบำบัดน้ำเสีย-บ่อดักไขมัน-ถังเก็บน้ำใต้ดิน',4,'2018-10-03 00:46:08'),
	(805,1,3,'งานเดินท่อประปาใต้อาคาร',5,'2018-10-03 00:46:08'),
	(806,1,4,'งานเทพื้นชั้น 1 100%',6,'2018-10-03 00:46:08'),
	(807,1,5,'งานโครงหลังคารอบบน',8,'2018-10-03 00:46:08');

/*!40000 ALTER TABLE `work_order_detail` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_order_preiod
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_order_preiod`;

CREATE TABLE `work_order_preiod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `work_order_time` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `house_id` varchar(100) NOT NULL,
  `preiod` tinyint(3) DEFAULT NULL,
  `preiod_end` tinyint(3) DEFAULT NULL,
  `condition` tinyint(2) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `work_order_preiod` WRITE;
/*!40000 ALTER TABLE `work_order_preiod` DISABLE KEYS */;

INSERT INTO `work_order_preiod` (`id`, `work_order_time`, `order`, `house_id`, `preiod`, `preiod_end`, `condition`, `created_at`)
VALUES
	(1,1,1,'198PWY',0,0,0,'2018-07-08 16:30:33'),
	(2,1,1,'119PWY',10,1,1,'2018-07-08 16:31:17'),
	(3,1,1,'237PWY',9,NULL,1,'2018-07-08 16:31:17'),
	(4,1,2,'198PWY',15,3,1,'2018-07-08 22:03:36'),
	(5,1,4,'198PWY',9,7,1,'2018-07-08 22:03:36'),
	(6,1,3,'198PWY',0,7,1,'2018-07-08 22:03:36'),
	(7,1,5,'198PWY',8,4,1,'2018-07-08 22:03:36'),
	(12,1,2,'169PWY',13,NULL,1,'2018-07-08 22:05:09'),
	(13,1,1,'169PWY',13,NULL,1,'2018-07-08 22:05:09'),
	(14,1,3,'169PWY',13,NULL,1,'2018-07-08 22:05:09'),
	(15,1,4,'169PWY',13,NULL,1,'2018-07-08 22:05:09'),
	(16,1,5,'169PWY',13,NULL,1,'2018-07-08 22:05:09'),
	(17,2,4,'198PWY',0,0,NULL,'2018-07-08 22:54:01'),
	(18,2,3,'198PWY',1,7,3,'2018-07-08 22:54:01'),
	(19,2,1,'198PWY',11,5,5,'2018-07-08 22:54:01'),
	(20,2,2,'198PWY',1,5,5,'2018-07-08 22:54:01'),
	(21,3,2,'198PWY',4,9,10,'2018-07-08 22:58:24'),
	(22,3,1,'198PWY',4,9,8,'2018-07-08 22:58:24'),
	(23,3,3,'198PWY',1,4,10,'2018-07-08 22:58:24'),
	(24,4,1,'198PWY',0,14,11,'2018-07-08 22:58:43'),
	(25,4,2,'198PWY',9,5,11,'2018-07-08 22:58:43'),
	(26,4,3,'198PWY',4,10,11,'2018-07-08 22:58:43'),
	(27,5,2,'198PWY',1,5,13,'2018-07-08 22:59:31'),
	(28,5,3,'198PWY',0,0,NULL,'2018-07-08 22:59:31'),
	(29,5,1,'198PWY',0,12,15,'2018-07-08 22:59:31'),
	(30,5,4,'198PWY',7,15,11,'2018-07-08 22:59:31'),
	(31,6,2,'198PWY',2,2,17,'2018-07-08 23:00:07'),
	(32,6,1,'198PWY',0,0,NULL,'2018-07-08 23:00:07'),
	(33,6,3,'198PWY',8,3,19,'2018-07-08 23:00:07'),
	(34,6,4,'198PWY',0,4,16,'2018-07-08 23:00:07'),
	(35,6,5,'198PWY',0,11,23,'2018-07-08 23:00:07'),
	(36,7,1,'198PWY',0,10,24,'2018-07-08 23:01:07'),
	(37,7,3,'198PWY',0,7,21,'2018-07-08 23:01:07'),
	(38,7,2,'198PWY',0,15,25,'2018-07-08 23:01:07'),
	(39,7,4,'198PWY',11,25,17,'2018-07-08 23:01:07'),
	(40,7,5,'198PWY',8,7,22,'2018-07-08 23:01:07'),
	(41,8,1,'198PWY',0,0,NULL,'2018-07-08 23:01:49'),
	(42,8,3,'198PWY',10,7,28,'2018-07-08 23:01:49'),
	(43,8,2,'198PWY',30,5,14,'2018-07-08 23:01:49'),
	(44,8,4,'198PWY',16,9,28,'2018-07-08 23:01:49'),
	(45,9,1,'198PWY',0,15,26,'2018-07-08 23:02:06'),
	(46,9,2,'198PWY',0,12,33,'2018-07-08 23:02:06'),
	(47,10,1,'198PWY',0,15,35,'2018-07-08 23:02:27'),
	(48,1,6,'198PWY',2,3,1,'2018-09-01 17:03:14'),
	(49,1,7,'198PWY',2,2,2,'2018-09-01 17:03:29'),
	(50,1,6,'198PWY',1,1,1,'2018-09-01 17:03:55'),
	(51,1,6,'198PWY',1,1,1,'2018-09-01 17:06:20'),
	(52,1,7,'198PWY',3,4,2,'2018-09-01 17:06:35'),
	(53,1,6,'198PWY',1,1,1,'2018-09-02 12:25:36'),
	(54,1,1,'142PWY22T',1,1,0,'2018-10-03 00:41:15'),
	(55,1,2,'142PWY22T',1,1,1,'2018-10-03 00:41:15'),
	(56,1,3,'142PWY22T',1,1,2,'2018-10-03 00:41:15'),
	(57,1,4,'142PWY22T',1,1,3,'2018-10-03 00:41:15'),
	(58,1,5,'142PWY22T',1,1,4,'2018-10-03 00:41:15'),
	(59,1,2,'119PWY',1,1,1,'2018-10-03 00:46:08'),
	(60,1,3,'119PWY',1,1,2,'2018-10-03 00:46:08'),
	(61,1,4,'119PWY',1,1,3,'2018-10-03 00:46:08'),
	(62,1,5,'119PWY',1,1,4,'2018-10-03 00:46:08');

/*!40000 ALTER TABLE `work_order_preiod` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_sheet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_sheet`;

CREATE TABLE `work_sheet` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `plan` varchar(45) NOT NULL DEFAULT '',
  `work_group_id` int(11) NOT NULL,
  `work_group_name` varchar(255) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `house_id` varchar(100) NOT NULL DEFAULT '',
  `status` enum('IP','DONE') DEFAULT NULL,
  `is_extra` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table work_sheet_detail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_sheet_detail`;

CREATE TABLE `work_sheet_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `work_sheet_id` int(11) DEFAULT NULL,
  `technician_id` int(11) DEFAULT NULL,
  `time` tinyint(3) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `amount` tinyint(3) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('0','1','2','3','4','5') DEFAULT NULL,
  `has_rejected` tinyint(1) DEFAULT '0',
  `note` text,
  `is_extra` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
