# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: construction
# Generation Time: 2018-10-15 09:19:32 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table color_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `color_menu`;

CREATE TABLE `color_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `color_menu` WRITE;
/*!40000 ALTER TABLE `color_menu` DISABLE KEYS */;

INSERT INTO `color_menu` (`id`, `code`, `created_at`)
VALUES
	(9,'B3PW1','2018-10-15 16:04:12'),
	(10,'B3PW2','2018-10-15 16:04:16'),
	(11,'B3PW3','2018-10-15 16:04:20'),
	(12,'B3PW4','2018-10-15 16:04:23'),
	(13,'B4PW1','2018-10-15 16:04:28'),
	(14,'B4PW2','2018-10-15 16:04:31'),
	(15,'B4PW3','2018-10-15 16:04:35'),
	(16,'B4PW4','2018-10-15 16:04:38'),
	(17,'B21','2018-10-15 16:04:42'),
	(18,'B22','2018-10-15 16:04:45'),
	(19,'B23','2018-10-15 16:04:49');

/*!40000 ALTER TABLE `color_menu` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
