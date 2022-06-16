-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: whatreasondb
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB-1:10.8.3+maria~bullseye

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
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `answer_id` varchar(36) NOT NULL,
  `answer_name` varchar(100) DEFAULT NULL,
  `answer_desc` varchar(1000) DEFAULT NULL,
  `version_id` varchar(36) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES
('11','З Божої любові для людської любові',NULL,'1','2022-01-01 00:00:00'),
('22','Любов до Бога',NULL,'1','2022-01-01 00:00:00'),
('222','Любов до [ближнього]',NULL,'1','2022-01-01 00:00:00'),
('2222','Любов до себе',NULL,'1','2022-01-01 00:00:00'),
('33','Любов до людини',NULL,'1','2022-01-01 00:00:00');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer_question`
--

DROP TABLE IF EXISTS `answer_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer_question` (
  `answer_question_id` varchar(36) NOT NULL,
  `answer_id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `version_id` varchar(36) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`answer_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_question`
--

LOCK TABLES `answer_question` WRITE;
/*!40000 ALTER TABLE `answer_question` DISABLE KEYS */;
INSERT INTO `answer_question` VALUES
('01','11','2','1','2022-01-01 00:00:00'),
('02','11','3','1','2022-01-01 00:00:00');
/*!40000 ALTER TABLE `answer_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `question_id` varchar(36) NOT NULL,
  `question_name` varchar(100) NOT NULL,
  `question_desc` varchar(1000) DEFAULT NULL,
  `version_id` varchar(36) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES
('1','Для чого Бог сворив люину',NULL,'1','2022-01-01 00:00:00'),
('2','Що таке людська любов і до кого',NULL,'1','2022-01-01 00:00:00'),
('3','Що таке Божа любов і до кого',NULL,'1','2022-01-01 00:00:00');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_answer`
--

DROP TABLE IF EXISTS `question_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_answer` (
  `question_answer_id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `answer_id` varchar(36) NOT NULL,
  `version_id` varchar(36) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`question_answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_answer`
--

LOCK TABLES `question_answer` WRITE;
/*!40000 ALTER TABLE `question_answer` DISABLE KEYS */;
INSERT INTO `question_answer` VALUES
('01','1','11','1','2022-01-01 00:00:00'),
('02','2','22','1','2022-01-01 00:00:00'),
('03','2','222','1','2022-01-01 00:00:00'),
('04','2','2222','1','2022-01-01 00:00:00'),
('05','3','33','1','2022-01-01 00:00:00');
/*!40000 ALTER TABLE `question_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_pass` varchar(100) NOT NULL,
  `user_session` varchar(300) DEFAULT NULL,
  `user_session_exp` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('2','qqq','w','w',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `version` (
  `version_id` varchar(36) NOT NULL,
  `parent_id` varchar(36) DEFAULT NULL,
  `version_name` varchar(100) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`version_id`),
  KEY `version_user_FK` (`user_id`),
  CONSTRAINT `version_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version`
--

LOCK TABLES `version` WRITE;
/*!40000 ALTER TABLE `version` DISABLE KEYS */;
INSERT INTO `version` VALUES
('1',NULL,'qq','2','2022-01-01 00:00:00');
/*!40000 ALTER TABLE `version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `word` (
  `word_id` varchar(36) NOT NULL,
  `word_name` varchar(100) NOT NULL,
  `version_id` varchar(36) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`word_id`),
  KEY `word_version_FK` (`version_id`),
  CONSTRAINT `word_version_FK` FOREIGN KEY (`version_id`) REFERENCES `version` (`version_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

LOCK TABLES `word` WRITE;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10  9:48:06
