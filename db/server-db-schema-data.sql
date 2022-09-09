-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: server-db
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB-1:10.8.3+maria~jammy

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `picture` (
  `picture_id` varchar(36) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `ext` varchar(5) DEFAULT NULL,
  `height` smallint(6) DEFAULT NULL,
  `width` smallint(6) DEFAULT NULL,
  `content` blob DEFAULT NULL,
  PRIMARY KEY (`picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `is_del` smallint(6) NOT NULL DEFAULT 0,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `signup_date` datetime NOT NULL,
  `modify_date` datetime DEFAULT NULL,
  `sign_in_date` datetime DEFAULT NULL,
  `is_verified` smallint(6) NOT NULL DEFAULT 0,
  `verification_code` varchar(5) DEFAULT NULL,
  `pre_verified_hash` varchar(150) DEFAULT NULL,
  `password_hash` varchar(150) NOT NULL,
  `password_salt` varchar(50) NOT NULL,
  `avatar_id` varchar(36) DEFAULT NULL,
  `forgot_pass_count` smallint(6) DEFAULT NULL,
  `forgot_pass_date` datetime DEFAULT NULL,
  `reset_pass_count` smallint(6) DEFAULT NULL,
  `reset_pass_date` datetime DEFAULT NULL,
  `reset_pass_code` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `picture_ctr` (`avatar_id`),
  CONSTRAINT `picture_ctr` FOREIGN KEY (`avatar_id`) REFERENCES `picture` (`picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-09 18:03:24
