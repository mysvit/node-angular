-- MariaDB dump 10.19  Distrib 10.9.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: server-db
-- ------------------------------------------------------
-- Server version	10.9.2-MariaDB-1:10.9.2+maria~ubu2204

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
-- Table structure for table `log_types`
--

DROP TABLE IF EXISTS `log_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_types` (
  `log_type_id` int(11) NOT NULL,
  `log_type_name` varchar(100) NOT NULL,
  PRIMARY KEY (`log_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_types`
--

LOCK TABLES `log_types` WRITE;
/*!40000 ALTER TABLE `log_types` DISABLE KEYS */;
INSERT INTO `log_types` VALUES
(1,'User change email'),
(2,'User change password');
/*!40000 ALTER TABLE `log_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pictures` (
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
-- Dumping data for table `pictures`
--

LOCK TABLES `pictures` WRITE;
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_logs` (
  `user_log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) DEFAULT NULL,
  `write_date` datetime DEFAULT current_timestamp(),
  `host_ip` varchar(46) DEFAULT NULL,
  `log_type_id` int(11) DEFAULT NULL,
  `log_desc` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`user_log_id`),
  KEY `log_type_ref` (`log_type_id`),
  KEY `user_ref` (`user_id`),
  CONSTRAINT `log_type_ref` FOREIGN KEY (`log_type_id`) REFERENCES `log_types` (`log_type_id`),
  CONSTRAINT `user_ref` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--

LOCK TABLES `user_logs` WRITE;
/*!40000 ALTER TABLE `user_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
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
  `new_email` varchar(30) DEFAULT NULL,
  `new_email_verification_code` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `picture_ctr` (`avatar_id`),
  CONSTRAINT `picture_ctr` FOREIGN KEY (`avatar_id`) REFERENCES `pictures` (`picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-15 16:06:38
