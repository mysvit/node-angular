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
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES
('2b5e095b-617d-4730-8e4b-8eeb5f4daea3','S','png',56,56,'�PNG\r\n\Z\n\0\0\0\rIHDR\0\0\08\0\0\08\0\0\0��;\0\0\0sRGB\0���\0\0*IDAThC�{LW�ϝ;����D�X��@�i��	->�U\Z�DK�Rb�Xkj���-h+�H}4�RH�%��+�ZJ��4��D,Rh�Tyc��eٙ��͘��evY�2���s����{�ҿ��Mx��!p���pp�*��)�p���s88f��pP\n�ĉ*��f7��A�e	������]��N�7�Y)��!���$*�;S��6⹈�,��g�ɍMTcy\Z]{_j��lM�6��x-0	���uy~��#�j����~nq܆���s�D ݁i�YU�\'��\'�o�#�@�Ph�i��n�\r��\r4�R�f��!Ξ:B����VG���>���5��a �T3X���bW�ּRU�EE	�����\0�s(\Z�uДsB}骖�O]�N�.��_�n\0z�y��;���HQ�@7&�Pl�\\O�;q�.��=dZ|���{�O�K���:�)�m㽜�L[�`Jqɖ�����&��T��ϓ�ۇOЗ~S�@a�y����T�@�Q�ӕ7-�Z��kp��B\\V���?��q�g�9�I�\r_?���#[̇�u�i��E��7��)F���k���M����9z�S���t�=��J�\n�%��6�h/k\0�v�t���Gu�_�CO���7NR�����3���T�]�S?�z����s˨���\n+^r�OErQAY\\�n�F�o���Cw$�(+U_2�W�o�sY\ng�w�5�� �K	 d������Q���9��d8<h1��E��O|���FBz���uN��΢�:���,6jA5���/��*Xk->����]Xf���;(�C�xQN��z�&X,F�ؾv�˭.���#R2��lB�T�6띸��:�^�%�Xf��+� �<��IK�mV�@_㮯���9�|#���f\rҗ���\08��ǼE5ͥ/^Q��������5�&�zXTI�c�2;2�@��yn,j�-Q���Ѧ����Q��]���Z���p�\'���7��;9,P�����B�\"1E�����2>HķO���\r#7�\"x�?�]���G>}>%�jT��AA��i:,�B<���>��B��HhK�x��χ�c���\'�J��\n�~ �}�f�>gv����W�?µMv֑V�\0��-|>�[�O��FX�\nZ�)R�\\�1�j���t��9-��Kj!�����l\"n����R��|��C�!��N�\"V�\'��A=��E���p^��\Z��⪚9��!���.p$h7ۣ\n������`�C��N����}�~|�҉�֒��(�y�rtu2k:��n�1��A9�:�5Nf����]�̚ϼ��t#��9�C\0\0\0\0IEND�B`�');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

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
  `login_date` datetime DEFAULT NULL,
  `is_verified` smallint(6) NOT NULL DEFAULT 0,
  `verification_code` varchar(5) DEFAULT NULL,
  `pre_verified_hash` varchar(150) DEFAULT NULL,
  `password_hash` varchar(150) NOT NULL,
  `password_salt` varchar(50) NOT NULL,
  `avatar_id` varchar(36) DEFAULT NULL,
  `reset_pass_code` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `picture_ctr` (`avatar_id`),
  CONSTRAINT `picture_ctr` FOREIGN KEY (`avatar_id`) REFERENCES `picture` (`picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('4a587634-b420-48dc-ae25-aac7e4b13173',0,'Summer Mix','q@q.qqq','2022-08-29 20:40:19',NULL,NULL,1,NULL,'afcde5822c9fa87673bbc47b057d7e4c2533edfd4b5ed47f67977374dbeb41793cb3db668bc506d7509e0769c8f236d3b707565b8c1ba7d0a89204bf88ec6871','74074e5ac5e69d543cee2759440f8985b8256dfa0cab1886706cc8fa533cd3cf7e3ac3d033a7ab30d0e70f147d4c875bb015d4f04122006364149120adfb2a83','92bb145d7053069b1475a3addecd3810','2b5e095b-617d-4730-8e4b-8eeb5f4daea3',NULL),
('9b1e248d-7523-450b-be4e-1e8e0851e899',0,'Summer Mix','q@q.qq','2022-08-26 10:39:49',NULL,NULL,1,NULL,'5142502ddac7d2fffc506e4c4949101fd35f4a5342e1c28e2c013ef8d183db4f2a3cf3c7d912d0ef937e8aa9d627e45f481e397a0ca1a75f51dc62784ebc005b','5142502ddac7d2fffc506e4c4949101fd35f4a5342e1c28e2c013ef8d183db4f2a3cf3c7d912d0ef937e8aa9d627e45f481e397a0ca1a75f51dc62784ebc005b','746acddde45ec0074c688ed1b48ab126',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-02 19:01:08
