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
('2b5e095b-617d-4730-8e4b-8eeb5f4daea3','S','png',56,56,'‰PNG\r\n\Z\n\0\0\0\rIHDR\0\0\08\0\0\08\0\0\0¨†;\0\0\0sRGB\0®Îé\0\0*IDAThCí™{LWÆÏ;»À²òD°X¬¡@µi°‚	->‰U\Z•DK”RbXkj‰¡¢-h+ÚH}4­RHŠ%‘Ê+µZJ ˆ4øD,Rh©Tyc»†eÙ™¹Í˜evYØ2˜İçœsßùîÜ{÷Ò¿²÷Mx†È!pŠ»ëppŠ*¼)ªpƒÆÄs88f‹àpP\nƒÄ‰*àÃf7À¿A£e	¢İÁ¨Æı]‰èN›7èY)Æ«!«ƒÙ$*è;Søª6â¹ˆä,€gàÉMTcy\Z]{_j¡²lM»6¹™x-0	Êuy~ô#Ïj¨ä¯ó~nqÜ†ÌÿˆsàD İiÿYU°\'õè\'’o#©@Phiûşn¢\r³Î\r4ŞRçf¸“!Î:B®¤·˜VGŸáÃ>°…5Àôa ŒT3XÀ®–bW¢Ö¼RUñEE	œÇìÈè\0ís(\Zñ†uĞ”sB}éª–°O]ÜNç–.Ìã_Şn\0zºy–;»¾HQ”@7&­Plµ\\Oİ;qš.¯ƒ=dZ|€Î{–OŸK‰§š:í)Ùmã½œÃL[Å`JqÉ–•¸¥Ïè&õ”T¾æÏ“©Û‡OĞ—~S„@aÊy°»Ïò€Tæ@ïQõÓ•7-ZšÚkpóÉB\\V¡„?óáq¨g›9I·\r_?ú®¾#[Ì‡øui£œE¸³7şÑ)Fà¦k«ùÀM–€„å9zğS®¹ætŒ=à¶æJö\nŞ%ŞÚ6é¸h/k\0Âv€t·– Guã_êŸCOŒ¶7NRÂàÂù3ƒşTì]ƒS?ŠzªöãÚsË¨Öşñ\n+^rOErQAY\\Ôn¨Fío–€„Cw$ê(+U_2¼WoËsY\ngÒw¹5›ÿ K	 dŒãú¦óª³ÃQ÷€­9Öâd8<h1æ—ÍE¬¾O|¢­ÍFBz£ÁæuNºâÎ¢Ö:Ù®ª,6jA5¼°ø/âş*Xk->†ú»à]Xf¯‹²;(¨CÎxQN‚âz‰&X,FƒØ¾vúË­.ÈÈÛ#R2±lB¼T£6ë¸şò:ê^—%ÈXfãú+˜ ö<“ªIK¥mV„@_ã®¯“Ÿ9Ì|#ë®¸f\rÒ—ÙõÕ\08ù›Ç¼E5Í¥/^Q„À¹Ìûû»À5Ü&’zXTIˆÂ‡cç2;2»@û’yn,jÍ-Qÿ¨Ñ¦¤ÄüÌQŸÃ]Àô¸ZõíÎpÔ\'ºì÷7‘Ì;9,P£Íøî‘“øB\"1EÍÿ„íŒ2>HÄ·OïÁµ\r#7ñ\"xÑ?]¶ÍÒG>}>%jTÆÿAA˜¥i:,šB<«áÙ>Œ€BØÍHhKîx‚áÏ‡êc©ö¸\'äJ¶Š\nÅ~ ó}ßfâ>gv³ŒìÅWÓ?ÂµMvÖ‘V \0“Ç-|>[±OìÅFX²\nZ¾)R—\\¶1Şj˜¤t“Ÿ9-™‹Kj!¯çêl\"nÈÉÆõRˆ“|ŠšC!¡³N™\"VÜ\'ÓëA=êÎEˆ§€p^ÈĞ\Zªâªš9Ôã!©ÄÉ.p$h7Û£\næÌê›‰`ìCƒ”N·ú½}Ê~|‘Ò‰‰Ö’åœ(Œyrtu2k:œÌnË1–ÃA9º:™5Nf·åËá ]ÌšÏ¼ƒÿt#·›9åC\0\0\0\0IEND®B`‚');
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
