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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `is_del` smallint(6) NOT NULL DEFAULT 0,
  `user_id` varchar(36) DEFAULT NULL,
  `write_date` datetime DEFAULT current_timestamp(),
  `comment` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_users_ref` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
('31ba5125-0a31-4195-92fc-487590288996',0,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-29 19:01:53','qqqqqq'),
('32929cb1-7225-489e-bbdf-e9c9da283e38',0,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-29 18:54:20','qqqqqqqqqq'),
('3729579c-291f-462f-913f-23f20e16cdfe',0,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-29 19:04:04','sssssss'),
('8ae09aa1-27f8-4d29-b3b3-98509ca203b7',0,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-29 19:03:34','dddd');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `pictures` VALUES
('29248eae-dfc2-4858-876d-34a0bacea571','avatar','png',128,128,'‰PNG\r\n\Z\n\0\0\0\rIHDR\0\0\0€\0\0\0€\0\0\0Ã>aË\0\0\0sRGB\0®Îé\0\0 \0IDATx^l½YŒ®Ûv4VóõSµ÷ÙçÜÓÜÆÍuÜ„X‰0È8\"\"DQâ)H ò)^€Çð<E€‚p@ˆFB @ðB Cˆ;v¬É¾Ýiw[õ7_¿ÖBcÎõUÕ%œ£¥¿víÚUõk¬ÙŒ9æ\\æŸø‹CŠ)a\Z\'Ìã“€¦ªQWœ1°ÉÀÂ ò%jùû0Ëäccœ±¨\n (ïë\0ceÆf`º¢|Ø\n8÷À»ËŠûëSXb@H	É\ZÀZTM}ãqS,ðó;øéövÄóÆàØu¸éö¸Ùï±¯[L××aBH¾jd½zs‡O¿z‰Ïß¼Á€„1%,Î¿lYDì÷Ž‡J×±Â‹]g\rp[FÜ”‡\"`_\0·(RBˆ\"E8þŽ¦€õlÑÀº\nK´˜’Á»ë€Ï^¿Åç¯ßâÕéŒ×§÷çˆ`Ztˆv‡dZD_`Ã\nýw§~Äy¸G0#ªÖÊª;‡¶+Ð5%JoQzƒf×+ÆË¬&0¡@Z,âj€è`M	‹ýuÆårÅu¸Â¾pð¥GQ(ËÖ˜?öo)¥„ñ	\0¸ùMYÉØØd\077ë¬K\0œµ( ,Ç¯±\0+0ÍÀÄ×õ\0®Ì\0€ûkÄ©\'\0\"æ°>\0 ƒªiph=nÊå|‡b¾ÇÎ€CÛáf·ÃÍN0÷úaÂº ¬ñêÍ=~øÕWøŒ\0H`-’\0 `¿+pØ—²ŽÇ\Z/ö^¾÷m™pSE‹;´Þ¡Àÿ?\0\\ÑÀ<À]?â‹7ïðùÛwxuºàÍiÄÝ9  ÅŠ€!:/\0X`1\0Ã„Ëph&TEÝ:Ô;‡¶-Ð6%ªbÀ‚¡¿`<?Àê3\0€å\0úá\nÇÍÏ\0(ËB@ÀÃkþé—ûO\0Œ˜†H	UÁXÂ$÷Ò¨œ\0„%a]V¨uP\0\07?A¾\r`\0X=õ#­g~ÞÉc\0~~Õçu}°!FÔ]‹c<o€.ÍhqÅÁM²9»ŠàèpìJìj NÀ¼\0‘?’@,€/_ßÿü\r~ðò%ÎËŒÓ<cäïÆáš\Zhj‹®µ¸½mðþ¡Ä‹Öá¶NxVÇlÚÂ£\0$”ˆðüÆÃú\ZÖ7b	–`0Fà²¼ëGÜ\r#^Ÿ¯x}?àÝiÅ´V˜Ö2¯B¾–›¿ ŸÆõãW´ûBV½ó\0h*ºô@\\0\\ÏÎâlV‡´8±Ê<˜)X˜äe\r×—ëýÐ\0œ·ð%àQ\0ÿÜ_J)F\0Æa\0ÿPzÂH! ®)ðs\nç\0k@X3\0h%\0\n‚Æ\Z„e¥GÕ\0¾Ì®€›SHˆÆ Y Zˆ \0˜×E°®h»·‡/:àèi’W9•{ÑvMÁQ&ßd\0CWåÏ¾~ïÓßûò¼í{¼í¯¸†€À‡a¼‹ð>¢*\rž=ÛákÇ/v%ž7Ïj‡›Ø—]áP 4O\0`lQÂñ=»Kˆ˜\"ÝäDO	x+\0èñönA?Z\\e\\ƒË´`IÀ’2\"°Æ	¾NØß4Øk4;¦õèš\nmcÐ6DÐ_ôç	ë¤î8Ìë1Oay\n†~ÆõÚc¯²ùÖAaá½Wðgþ€`À8Œˆ!À{ïœlôº,ˆa…w…ƒIFþB€áÃf`\r\nñ1Š*þ]ˆu]£i[”µÅ<\'LËü°¹KXa)/¯KXÃŠ•¯‘´m‹›]ƒç­Ã±nÊ„CÑ¹ˆÚWh¹95ÐòÄ\'žJ}ïrDðÅ+à{ŸG|ÿåWxÓ_ñ¦¿\0\"à€f¬­^ÀÍÍï:¼×ÕxV—xV¸)=U®ò¨,Pr™S,¿OÉXÀŠåšSErŽ®§~ÅÛÓ€ûÓ*›Þsã{Æ>ç~ÂÂMOFÜWÀ‚¢v75öÇ%cÊ¡+Yüoèá\Z\0‘Vu!\0æyE\\OU4†	}¯\006Á¸$¯ŒÑ¬sb ÍŸÿË!¥ÕŒ£lžwÎ9¬<ó„u]\0Æ`-\0I6œfŸç¼ƒuü\nÚyÆªº³B¿çŒy™‰ùzZnÿ|?ƒA`U¡«Jƒö>¡ãr	•¯Pû\Zµg€*û-ÖDÞ{v1¯ï/ß_Ü½ÃÝ4ân1òw«K1—Ë÷ww¸^/Øí:Ü6-në\ZÇ¢Ä±¬p[U8ÖDKÔÎHL8D$á\nWYØX¡¬X5¢Ë×1àÂSØ3r˜fa´¸\\.Ã„E¬–Å\Z3\\‘ÐìJ4»®äfÑJY´-—ºØ‰–Tq‹õ•\'Ÿ+	ßæ8\0}E?^@hÆ´ÈkÂöE€ù×ÿ£ù!\0ÄU6À9+›4M#–e–Í¥á©)Èb\ZÀhŸ@ãœ,ý÷45…÷\nÉÓ8È÷Õ\r‡XùzïÅ•Ôu%›Ï[9ƒÆ&4&¡¶­ZÇM¯Q˜…-á­U¿ìÔ\0\\÷=ðö\n¼œÃ‚KX0ó÷lTUW¯Þâ³Ï>Ç«WoPW\rvEƒƒ¯±sö®Âm½ÃmÛâÐ4…ZšR÷V€ÆLÆq•ü¹«Ä|C´h°ó\Z0M	Ól—nÁµš}u‰Û«q@Ù\0%ã\ZyÖ„5m…¦E¶\\<õò£øcäP\n¸$3S(\0€~<c\rc^Bä¡&Ì_ü•>§#¦™\0°ÜlÀ„q1-ÓC)A€IòÀ(‹¿8ÑÉÅ VA\0ÀåPªÒÓ@b™\'Y&EX$Xˆ `,á=êªDU–\ZCÆ\0‚a‹®ð¨‹Lw<£Kœî¼D×ÜüƒÌkH²ñ—¸â’VÌÎ\"Ñ*Þ¾íñòå[¼y{c\n”±@\nT©@KÜVÜvNÑ¶ÒE\0ÐËh€¯ðAâyøyh9—%aY<sshøú+Ð\n\0Æ_a[|œâŠJÚxrŠŠé-,ÿMBˆF6Ë¸xâ%ðVÊï03\0^\"÷–›?\"¦Y,²|í¿ó+q4ËÓ<!rS¼•M \0X\'I!íŸ5\n\01%É0œ’\ZAV‚µI¬AQ#pØ·-v]ƒÒ;Ä° ­Ë\0Q²‚ bÔ]Ë‚Àßišàùw)¢¶]U¡­v°©£n¢S\0X‡Èï/>˜{ï0{ƒ>\\ãŠ‘à(<¬­p¹Ì8œNæ9\"t°€¬¬›ê·;ãNM.€›«\0€AnÍi\0)&ÄÈ@xÅº$„µ€¡y‚ž\\ñác€€ ±^¹ù´\0bø³\"ã%#Ö–èKü?YKWù$óÊ›¿€ß“ |Þ˜1Ëk¢+Èh1é¯\\Å,ÀÂ/ˆjÎ§\0˜Ì@é%… B£üˆÎ\'``lÏEˆ0,g,Q\n\0<nŽ;ÜöhHÐ}ÐÒðgÑIºÉ`“ŸƒXŒÂ9ÌÓˆ©ï1[(E×4èêL ùÁ§j²pâO¹s(Ú¾m`Ú\nC\n‚É0H©´qšÿDœÏÆûsök”u(o„l:îuó…\0Ü0þXW?@>.õôÉfæ VüòÊ¼ÜfŒ=³®\0ß7üÿkÄ5ˆ›ˆX‰Muhq\0Œyä8?ž~bNÇ%#çƒË@×ÍP5[‹_ùO\'À£\ZÌÑ¬\0fÍÅòÆ‹+Èæcáæ‹ kFò¢ ùwhëME×E7“¹­X…e–OGFÒóM’q‹)2ëXã\"o˜î¡)\ZDòS@˜¼)²ßq0žŽšDJ‹ú°G±k0¦  ˜LÄBß\Z¤DÓ\\`\r—°`:­X.ó9 óìël|S5Oü\0H@ €Ï›l@ƒÏˆ©ìºD„…Ás-à& þpýˆ`ÇsÃ€–¦ÉY¸r$Lc4¦ž–iyf]usó¦oqàÃ.+\0÷ˆ`þËÿ‚Y@Â4MÙ0`@÷£\0 ÿ¡à7¡Éßâ\0@Oÿ#\0¬‰²ùÜ`€æiOaÁ:X§m]áÐ5òªŸ›²HòËÑr0½dð¹¦3¢aTìPºë¸bb:5®(L!Á7Ÿ1-XwØc{D}Øaâæ#`¢»£‹Î5ð¾…5µ¸ƒá´b¼_1ž¦S@e:4E‡Š&™LgÆ˜X\0ž6_u‚­\"L±Êsã1§åIf<ëLÂ¬’E\00‚Ÿ¦ {ŒV‚7ºŠ%,°Ìpše£Ö–‚±@?¦QÀgB\ZÚU°ä<ò×m\0ˆÊß=Xî™Ä\n[œ–_%ÿïÿ+ÙL#ýý éS³-œFq$uÄl1ÀÃÆ+\0$HL\rƒu\n\0µ\0ä±iâÅÌ¯³l6}û®­qÜuèš\ZË8`á¤“ŒŒ\"ê²DÕTðu)Ì˜â,éÃpe\\0]Gy-ÉÍ\0è5½Ü	\0h;,&aå¢PÂû…ïÃ0_ùŒçˆéác‹Â•Ô²ÆÁWÉ‚Èâe\0˜2Á”ÑÍš†2@$ÀhU%‹Z±LtÝ%œ©W‡e¦ËU\0¤h£‘?3èf,UÕÊš€¦¹W\0\\ÇQ@ÀTÓ—%|©$y‚€_Çæ×JvÁó˜™XÉòßÓbHÎ÷Â/ùŸÿ;\0ÀÀMËC4Ë˜`š,ë,A A @L¾žz‰äôë¢_g\0H\0pßi2½ä)+ö“ÕVöm-®\0 ¯_‡²%-@åa*n=×b¿2ã‚e˜±NJ[H¾,\'04mƒîÐ¡Þ1RÓ_Æ–®*eã©axŒS%k‰8z,ƒÅÜØ•f;çYÙ¿Ê3šç{*t¥\"bI£øè•Áýudô=a\0$8£\0@ô$nÖ(›ÏEW0‹Ü´¬ÊÙs—dó4\'ŒóŒaa Ç,¡FQ¶p%©èZÓó¼©üû…V†:»µüÍW!‚¬’ç\0üÕÿE©`ÉûQ6[óƒ-.eShŠ¹ˆ$yÀ‘¾_4O?Ó;ú}=ýº¶ÏI\\À¯¡ùbÊ—Ó¾º,ÐÔ¬;xLÃ üÀ²LÂÄuU>¡ú\r«\r²€•o$DÄyAgÄeAe3SIh®Â2£\"ÞÔbEJ’?UŠùt×¡kB„UO`á\Z”®…Âl\'‹Ä\"ów‰Ôõë\"™PBÝðÔ\'$omÂ¸ŽÖÓ\Z1G®„a^0ÐJMÎÖp¶‚aM1º‡ï™äÀ´pB?öXÃ,”-7”–„Û´&9`\0XÖ5Êºƒ/køB)iâø»±\07Î$¦xXi”·á^q_«\0ÈYü·ÿ[bÖ\"¹)yc’>;ú¥E²²wÌã™šÑh`¦A@\'&Ö&“=šÛ3àY°®î˜zðß({ÈœßgÂˆ”3yþ.²ŒüžL£ø³¤pä‚ºl@0Žn‚tòº\nWP;Æ,„ðÄÑrèÉCðD•6Ë5yõ®Á®ÝÁ2’–øÜ¢*kTE–}H\"¤ÕJz)ù;¹¿h“.aï„°’zkd³ûeE/5hah\\pf¬t1Fa)‰ ‹VLt\"bø=\rúqÁ0õqÑZ†d[¬Žr#3MNëIÚ½*QÊég ÈEëWÁù!Œó‚qZäûê1ÜRGÒÁLÍY·)”´úÏÿµ\0×KJt™—Ì.9‰z\ZxZY!$ëÆâ7“ÎPÀS‰	~Óì~x¢‡áŠaŒ”jfäÏÞ@”ÿ‘ RÒýÅô» ùˆè¢\09Ì2X¡c¬dª–±ÆŒ¹¿`®0tgŒKÀb–RuÅòj-©¤‚šYH!n¨.ñù†9v²p†Á+i(/YCL!9¥nMh<6XÍ»,	ýš0$‹!\ZÜ\rîû	×~Fà©ç¿‹VLô©) ÝöˆÆa\\VL}üš‹YI>^ã\"<€<\'á[6Ú½„1\nNFôÜ|…\0ã²ùñçHÄÇ¯ó(«Z¬£|ê?üë\n€ËeÅõrÁ*\0P‘ÇV\r41¡.+4EÏè!WÅ\n“A\0X!q4¹Ð\0£¿^q>Ÿq¹ž5Í\\&1Išf:)þ0Î`aHj	ñ3µÑ¿g ÅÉjf ˆâkÉ¸q±,[;n<ÐäWòõf±\\O˜¯g¤y@b`VÐ“Ö fJZ1%-$5mk}Õr«ÒÏÂJ\Z“ilž¬VC~q‰i£ÇTˆ¨°¦Ãdp^k0¸&‡>9¼í¼½L81P\r³,õÏÔ?¹4¬º:Ÿõôñ\0.aM–u·ðÀ¸2þ‘B@êã§ñžAp%á0®èYc\'AnËØ³`W¡ªÔL]	€ûÿÜ\0Ð£¿\\æU6™K™Þ\rÚªFÇ\"\0ˆH\\ÊPÈ×xãäÄH‚LXPr‰B¦/ý0dÇ,ƒy¬“’°&”I6œŸcÐÃÊ\Z+‚ZÝãƒZ5Õ*ésWMø0£0+?JÃ”- fªI+3±ú2ÀÇE\nð)2ŒÈÕ¼üj™eÔ¥ES’wˆðŽ—FÙÌ¦.Ð´ªúF@à|\'„ô²zÌ+O[‹\Z¬©Å¼”¸D+•8c˜o†ˆ7×YÔ>S0˜²*Š¯wÎ—0QffiQ†ÕÑÊEL+ixÆE¬›h¦EŽE©veDò¸±_X\Zº‚€ÖŠÊ%Z/&át_IIª½ÊFáßøÕ%Ñß^¯W\\ÏW1÷¥+„“çyvD—qØU-ºº”™aÒškæ\'À‹ÕPšt]u `XÚ=]Î8].˜HöÐ¼“7—üŠÅƒ¼,ËÂ+®ã ‹_Ç€È–	7‰œ»]…ÏÆ2ÀÅIWšQiE‘Vø° ˆj‘XÅcàD\0Ð`¦\0K×F”Ôø$¯U%X4`5+öû\Z‡Ã\rvûç¨ª=Êrc+ÌËÛ%Bl‘ 5TLÁÖ]­\0ègÜ÷³^F…#\\	¦ªa«’†½yfåqò[‘†ñ‚iºfú–ñY€sJ™ËÖó’fbfSvâ¦xú	Æ\ZÜ|q=Ï–Gžj Vb\"qî¿ˆ	 Ÿû)$\0Ò—Ž¾VN?­\0…¬ÿl›O00ôäÙ5À”ŸŸW·#žâtq¾^0\nÝl„Kçæ+œV¾XÀX8õ¸ô½X\nfT1/\nÆ&gØ0ÂÄI6Ò\nø´ L´Œ¢T¥ŒKóŸ\"|bð¸Â2Ó\0Ô>¢piíÖ^@`A°`·£\\lÝîe¹CYvÈ-‹Á¼I¤B£õf×Êæ÷¨d½›;ÒÌÜd1R7-Æä0òá”\rLM‰\Z03hæzH¨©¥L€yºäß‰\nB²¡J™s{5³b…›ÛÈ†¤·ÉFžz$Ò\0Ô59OŒ‘&`þôÿúZk:[úJ/ýmTV¹R-ómãÅçóï)@à+Q¸)˜ÐÂmM9…¡ýD÷Ç\\YZÞt¾®´)Š HÆyÆ‚Q|ÉŒCŠ(lRSîÉÌ€;š|zf“PÙ¤Ö êâ¦Ûug=ÁfAÍÚ{™P3¾½®Ä­áI›P•	#n\n?I41LNÄ—a¥¨²ƒ³;YÞíËƒX€ûÅÊ:kpè¹éð˜P`2\\^V(JD&%0ee”ð©¢ÊZÊ™xÒEž49÷ˆq\rÅdšZ;žÏÈ³^ê¥)ò8ÉX¸9\0ÕÐ™ñƒm‰Õþä_ûTêÂÑœPT)1\0	òì+âB+nN\0Pµ2xò	\0ú{CRc£žrHËÎ”†p•7E?UF?(’¨H%b\n+æ¬ESK—KÉüeç†¹½1Ø×”ƒyX³*Ò,¢@Ë¸\0L	ò›S91 ‘xþu”˜ õôû]¥E‚ÀDžþHŒœO®IL.)>}ŸYp —(Ü¥ß£*Ž¨Ë#lûLÜÀëkÄë>`@É6˜\\…™®#¿ÊŸ])UÊ¥\0fŸ gJã>\'RÄbaÚÊ ©éŽÉ¦^—6-°im±gÜbéïB`=‚é%-\07ö°D4LC½h${\'\0~ùW?\0°ÆL[M\0XFô†BCòØ«¼RÌEÎ½&\0ŠZ™¬@~_“RÎ;³> Ë³6ÿ¦›žß?¦×e±#¿in<Ù4ºVk2¢Ó\n;-RR9”•È£húÀÍç‰Ht5;hH?®“dZ}áë€‚³ \0Ï#Ð f‚³¼›uùÖð!«Uä!àˆRž£³€·-JÛ¡t;Ôþ\0Ô7Ñàn2²ÃÍo\0“#jy½þyt“‡”¨¥LÍ_Y¬á“x ©Ü­)EÈoârAZµzTÑý±ÂÇ´PL¾@¬•ˆÙK$S#ÙZ$­Üê|ÞaþÄß¸\0°|É“,•\\ñþk\0_yÂ¹¼e|P¡ÅÙ1E…Z(Òª–¸\0Ms%@ ×rQ~ƒ¹¦Naß8AÀg›=ÊciÔ5cŒ‘ \0šø0(Í¼¼–¶º\0F÷Þ¢.,Œ40ðôO²ùCW´žé`Ä:Þa¼¾Á:Þ‹E¨+®€¦Jò±·Á* |È² -Œ‚èðë	¨àM…Ò6H~‡Ù¶èC>–˜ŒZ€ÑV¸á\0Äƒ«‹›¿¹E‰‰øüØGÁ\n(«„›\Z‰faéa¬  È\\ Í¾X\0žòä*˜óé¢;áìVþg~•G8‰î/¬dà²º’\0XVÌKšûÉ\0òT“8a!…:ÍL€hû\0›ÔIb€¬Ð•7$j~Í.8ðÍgŽ=cP«YTÇ0À!ÿÁ`ªDm –L7°	å)~(hþK–Œ·`•K-Aš¸´JfP×ÓkœÞ~‰þô\Z]ãÐ5Ô\ZXQàòµp4­A«˜ëŒÄFš\"˜æDØƒäHø“ªlÕVXMA…ÁV²ù²ää70š=A`,z‚-`†—Ý\'C1n<\r\Z—Í8Ðf|¶ÜV¥¬y µ$bvÖ<\\õ (á3—â]À?õ_÷R\' \0˜®q“É,ñ«)í¦vL\nb6¨x¡ø³€sô7zÚùyV¥øË\n\0hÎé6\0d éM~“R¨ØjÙ4ê~ä•¿!Pe\0ü¸ã©Ô¢ÐÈ¿Í·UÅ´(CœïgÄgÆy€K>M	a¾bÎÓUƒ,GK€\'ÓÈøÂÐÇ2»X™LÁƒegr\nÊ>R¥DŽ´´%´¡7Ö¯4ÖÄ³YH`¸`rÙ-øÓa°\rzÓ\nw@+È}ak&ñøLIbiƒŽ¦}sþ>Œ	Ô0‘d•Sk´æBK(ukaX%}Øªƒ´¿ôïÝ© ‚…¦ÆŸ$ÕÓMqƒ˜t•\nw-’bjïD²¤?ˆ’pV¥h^\0Ê;™+O )ÈV–Ì©bC²FŽ2t,¨‚‚¬2P$Z0«A)6ƒH<ë…AU;±òf…ÌŠó€¸PY´ pI²	N\\ô”/„qýZþ™Y¹†Ö\'4T$—@WZìJ&„éjXGá!\" Y4bÎßÏK`8Š+¨%Uœ}‡Ù0X‚@p%™”Èå[¶ªÒ‡\0ØòC€)7-³‚€\0`dÏB’Ek.Å,JçŒf›(„@bõøßüJ\\èf¤³†¥£ú=bºµ\n–6\r’c¢¥J²ížji\r2Ò$ÁTªW6\0‰ŠPÅ¤òsT®FâPk°ðA³\'\0°ps„£\0 âî{Å<01¥$`YêdÙº±ª¨ÉoR4|Re$w0ÃÉæChášµ\0¾þ=%ð”À”¡õˆÌ\"Ö.ôØÜüˆ{jƒC\rÔvF…	e\Z€å,E/öRWáÃ\'•>³Aƒ\0+Ð`²-ßarGŒ–iã£Ù£Çs¬±²4m˜Ëdå1¹‚A\"µ\0Ü|ZF©pÖCh˜±ðÄóôGY\nZ:1•Õn§_\\\0áOÿK?@ùŽŠH#\ZÑ¹³ÚÅWYŽ,žêî\0’Ë\0\n:_Ë&€Â\r\07W¤¹6MC‹><>T¹ùHÕ\0}ì\nYE@$}Êd-!QV¦­´6\0#bMiÉÑNXãŒHô—Š(Ž\nÔ^YOx,A¦¬£–”ÓÜÃ®g´nFãft>`_q­híˆÆhiç“Ÿ¨w à5…UÔO¹ùTaÌ,!ÃÙu˜ì£9ê«=`ÄKj…V–>B²óŸ\ršœþmó·µÅT´•Lç™™)\0´Sˆ’7j ¹h:7å¶ÍOþÔß ‚(a\0° ã¥håd±ìÉº7?¶…–E‹†5êJrw0Ò¨²ˆ®@kÒ*&UÁ†2X	\0ù\ZQGæÑ½³3×¢`Âº½¤¢Tü’PáÛ&‹f±JW*»Ql]Â×kÎui!¸ùl¥Idù|û\0ÚÇE ¬,çç˜Ï¨ÌÈNAPìŠ\' f´nîOR±ÈÍŸôg6°]ÌcLì$Tb±´{,ö€ÙôÕì±²q4u‚%¶Xc«\\‹>0æ\0(,‹eÂ…¨¯–ê¥ãÒÙÅ\0Ÿ²3êiO©pb—-À×ÿøwD¡TÐ¤3ÿ6ÒçÍzõãÆ‹”Š  ê6\"wvÀ‰ð¢IÖ¦`Už6Œh9SM<a@}€T£d“U´À_\\tYc ½–}y¹>Ÿk¡(°\0ÆJÇ¯\0€Gƒi@éE²-mb\Z·4	\0\0 \0IDATÊrÉfH#ÈˆéÌX»Ð¢—°š99–ài¥bÿ#S¾v½Â§>(Í„ÚÌhäôO²ù\\QXeJN)A5‰®n€0×œøê1Å\Z‹éH8c1;¬f‡höØa%b—A@ö‘I¥iÚˆ³q |kÜñYèq-ÑÓMhZDÎ‚ÂYŠ^¸ùT#‘ÍdÉ›Û+1ÀýÒ‰\'’¢ÐašÔwg±¹´9Ñ<€@ –!ÿùÏ†Ý6-E\n¬•“Éºù¢>!K¨br}ÍúÁÜÄÊ›ˆK¾ÚlÂAE‰ ©Lf=¥`Ò·ÈþzJÇ­Ãb\0 m¶1KµÄ\"ËE_ÅÅ€¬˜äç5ºU_!þ\"¿ªŠB\0c\"³\\T ñŠÚ¨Í¤`°*·¢t+*¯¯ôËtÞdîÉ~2c™Ö$kX\n,±Â\"ÕÄÑvˆæ +¤-D$XudPNëJ›óxrð­ˆ7QQ™<¦ñòY6ÏÍ—E\0xVs\Zøø­öTNBÇrÓÕÿóùlf>oþf·ù°70\ZiÙÌXÃìuSÀbŽ¨e¥‰d‹Tž$ä±¨ˆTJ)Ê\"‘“)Ò)à`Ñ‚õ\0žHºþf!Àê=öÙ;57djxœÃä‡âDÖcÓµ<4Ô‘zÂ>m^vc¯DÊ6šÐÃ¬º°\\a—“•¾Z„žõ…mI2) \"IŸ\'³©•3ÖUÔ:ãDÕµÇ\n,]Õ’\0àˆ€\"c‚¸ÃÊÀIYZ8“²9÷›•7«Ò%š…€YüñØYÂ÷šûå5,eð¿ÿ^[Ã&\nÙ±úh¶ ðÑÿg]Fó9Bijøº„)(åWy¹ö¥sGõd\"\"qÖŠ~PãV@Ùåß%ù*iXf‡]”ÅZ\0\n‚ÕXÈAgR–Ì+“Cj2‘/M)[fZØÙù$ÊÎ6#¬lÉVD˜Å•ÿf>¡WøpE{Ô´\0vDå\'Ô~F]Ì¨ý$“H¨€Ú„YÌn–‰b[¶n±¬l±,<Ö<é<ù\0éˆ5d¨ÄŠ\ZÁ4B.[©kãZ\0áØsÌÄ÷¸uH±.S«d˜ÖL5&Æ=Ôd\0|ðÓ/Ÿ4†Ì’×K¹\0Mû¸ñ\Z›uØ|µüTÎˆá÷€*\\Ï˜a\0·0[€­¹”me9ÇáïMÓÏ¸\"T@áENF‘¸	šÞq@`ûWA+7}ã8·” òI–øI5“¶à(ÊÂÔCÐLÕ¿ýÛü ¥ž•Û ÉH`8Ñ\nôpÔ%¬Jáã{nDéF~BS-ÒPÒ”te	%Û³“Êâ×9afut\\1¬F2}¦; Ôð50N0\rfÔ˜\rYÆÁµ’R8#é²X¶ÜB¤ùµ’,\"7fá%]øš˜öÖy@`ºŸùan\r[¤$,ÊD¨N(<È1AÁD]öäá¤¬²À#ëÑÉ`H}\0A@«!1\07RÇlAÄBh·1-³N²(+Z\0/?KÒÃÍ8+}þ²h!6\0heë±]Ve¦£¨—¬Ð—¤Œ+4u#\"øV´_?×åifsÐ%:§ÜŠÍt‘M-‰íjÓ3Ï°ËŒ’l `í\0ç8; ®Ú:¡«š\"ÊbòŠ0H=ag,ã$¯Q4eN5 L\nÝ‹ë0³°d¬®C(:úGÌŒÝÄ2æ÷»Y\0	l)l]‘¦€D•j^.:ÔŽÍ±,	s;î»Â¨/ÑÊ—pºLsßÀÍç+‰›-%{(üÁYØ¡qAnTØZÊZ¼ù”xÉißT$ªü}ä973Nv‘½…\0Aµí¹ù’>Õ%DÆt9žÎæZÄæÖ8¯»jcB|Hp,DÖ×©7(ä•i¡¤·«w<(<Â&r™ÙD»È¦…~a‘ŒÕQDZŒí‘L˜+\nrÕŠŽ³†J]Ì\n\"NIÒø: ²€}‹ÃkDÓÉ,!¸b±ÇZî±;¬~‡¥¤î`\'™H€1äÅüŸ\ni’DŸÛ,›_Æ‰2å‰Ö­óT`ðþ¾\0@FüO8€€lNœ£X’‹*T>0ª[WQ“@Ébºj›ªˆ?Y•ã&ñäsm¶t£´l\0ž:S]Ò%ê`8y„µ>A\0æ ž¯ôûyâg™JÊ´„ÇÞk¿&”²Š5Áñ˜ç T’Šs(y§R–9US;q›b«(ç\Z9ImÅí8¬HWŠ\Z‰Y˜Å¡ˆTå²u­ÇŠ\".°%ƒÂ»bÀ±Zp¨fì‹dÖ]‡YÈ3\\‘¦3FÊ\"™ÀÑ´°Å©:\"ÔÛºÁ*ïYðc š+Fô´Ž@Â—u\nƒ0ÍX‡	©_¾‰E°è|-SÂ\0ÿ¸22ÓMÚI2ëð´áLÊGd¼Ed9¯L¶@U\n	-1iVÅh]{õLÁTò\0A*€é±ÄE^S¬ÆwÀI‚+Iâ‚€Ê%`â•?‡›/}*A\0l¢Ä!›¿²ˆDJò±_´±EA ™EÁTµ´²BaK‹Ù’Ðb\\à±Ì”1`3ÚXÈŸK`.@ÆòÛå.üYRÃ¾ Å=ÅßãX\\q(ì‹%y…¨¤ïEÅ³°pãZ$×ÂW˜æ±{†ÐÝ\"¶Ï°67Xª=båÑGà¼RŽ¾âÌÃÈé‹–¯‰ iFè\'¤aYK‰¨“Ã¾le|4ˆú?õJb€À<ñ7 ³Ë5Û­ô(ZJ9-L,Hæ&æ”Z=¡Ú:•GÈ0~ÂZyzZ\0¶uéÀJ«7š¯#^ôëÄ‰¤ó|¶µ¹x¿²ùyqB‡hä¤)žt,OC9O¾À\0œ\0`ÉÝM\næ.Á³u<a¶³ÉK\nb¤QYþf\r¯lÞo¥•ÌpR‹ÌÄøæyüXz\'Íaë;˜õ5vö„Îžp(®¸­G«€Žü¹²ˆË	+Ÿ%güQ‚V´¨š=|÷Ø?vï!íŸ#47˜Ê\Z¡\0Np7qÜM3†~”M7Y©ÍÖ¹@-Þ°À/	nIhM‰›ºCÛ±)ÖÂþùû‡Aì³{ã%B&¤ÑPydJ™9›§*Ùæ¤ö˜ƒ£´Ùã‰ sù¤IÐ(\0¢úUb%¢-uÆÎÆÛoâÐ­\\,¼õ“%\0àÓŠçï³•OmÊo\\<Í!OBI\n™£îH\'³´LQ›-¸8<AÚÜVÃÎác\\0r4‹ÈŸùùËæ>p×È	5v\n¶ÚK!?pf?æ9é€jG—Kÿ_Á›jœ±+zÜ6+nêˆ=Ýédf\rñ\"î‹V¶(i¢9f‡²»Ý?‡Ý=‡Ý?C¬˜‹RÒ^nþ›#p¸V\\.,düªÒ’ÖùQc\0ÖP\n)¥W¸iwèv­ÒðïýÙÌpN ³¨,Œ-˜šhÅGÿl“—>ü‚@Ú°6-«»·væœ‘l-æ?OÓO§ËR±¢ •Èóp6ÒŽ‰uƒ<…LäéÙW·³•§·‰ÂŽåT2Ç\0äõåd¨\nV¿HoÁ?óÉ´3kÿIêìùSu>)Üì%ñÎ€\ZnÎ„1\rl,µ_ƒáIF>+Æ\"ñRÓœ³1å¬w¨ì•íÑ¸­ŸÐù	‡jÅ±Z±/T¸ˆð•W:!…­ntŸ•}k¡Ñ`0XvX‹Î«Ã)Pï)º‚t³3‰8=,ÎQ‚U¾o‚Ÿ¥tÎXl\ZÌ‡á$€£b	\0nºv²²EJÇ¯Èñ¤rU] T¤”Ü{ REÞ¿µOgÍ™ðyI›°	Fš)\"¡®€@È³E¢Œ™T7ášÇ©Dvâßk›cBŒ¾|ëAÔþEJÙ4õS‚P;~ØË7O@~,£pÌV¤Ø¥oYTTú0‚,wÛRåˆ\Z9,OÆ\"ÆsÌ!ÏžHJ·®¨X0r3\n;jëHºàX¯¸mŽu@c{”†r’idµR¼Bj~b1)êb!)å\r4¸¦×XãJLŒQVj™63Fó¢`¶+E+bZi\ZÀ¶¾€á+u¤Ýª‚+x7ÈãÉi”TÆRgÇ.Ù6\0Hàþ\0Ò±’É7‚€3\0µ\nÄÇë¼­*Ç`dã….ÊfB2¯-j‰ö`i‰„@ÈHÈñÆÜ*£íëÚ|ÿ°$ç•ò©– eÎ)kþnì¹HÔAd!^þè—ƒ(U²”Iâ\'ÃŒˆkbˆ´Š> °¬mˆd…¹>`Í$\ndîqØ\0Ð(\0j· ±Ô,2]¤”ý*SS†Õ Ÿ\"®œ+Àª^Ña)nEK0`\'Z‚Kê0¬$—@V±”ZƒLe.!­ª‡Ém4dÿòwÆÄÉÌV†×,¥ÑÔ±~Ì±£ü¡dZýJI‘S¹¤Yl7c\0¦‡¹züP“É!RàD±-ÿ×7\"OÊ„’JË²’ô©dURŠìèóôKMµA\0ò*c“òh†,R|jžò×<i¥ÉÃt¶ÑZ|:Úš&€dz$“>”/È‘m¦Yù|2Ó&b–üo„£ÈþÀè ÇGv†ã\\AÇÏS3ÀÂÒ=vå,n`_Qk0HA©s\\‹ÄÌHQ²¡ã:pØ$\'©’¨¢Øô×´ÿ‘5ÇK¢‘z‚F\nIBˆ;Ôô¬´ÙÃîbõdmèŸýŽTWN-âà^éèa$Ãhw±Ù˜å»t	âsYj«¤‘#`\\°õ+åÊžzÿMÐ–ó|É÷©`ÍQ‚œ°¼‘\"e®UnõÏ,)Úª ²VUåÄó|ÍnBëžÛ×=ùúmÈÞVàÚŠ[Û×«òqþš\0)‹¶Q’ý¨”ž§^ÒQZCÚšµ!âµ›GRU#|8)Ô3Ú‚åeV¹ùä\n8¤šqF”x_®“,éû}Úá\Z;\\B+¯ö˜sŸ\"u0-˜­ä¦±ÙL§8ë†ÝÁ•ò\0ÝŸøžƒdNð@	ßd–ò>ŒÞÜØ—|\"·LO‚@ž\nÉûVÛ_¨Y½M©Ú: {‘ðÖi¼3D»´‰u`ÔCL ”?·}e2 ²½ßÊŠÚ@ð(–ïEî W43ñ0uqû]·ï¹g”L2Õ)Ûy›c/›_é¸6\0h¯á&ŒgíÞ…JŠÅ(4áˆxÀŒh\rE&‹XÖL(äY:Þ1ô“Œœ¡èCƒËRã²êšÌ¨/èd,}0; TÀš,¥‡TM[µ2eDx€Û?öRzÙ½;sZø&çÝ”œ[|ø6¸iÀ·ys4‡ò ŸTcž”Ø¥¦ð0ÚRO‘rùëLÿ&Ú†ÙÐçæÐ?—ŒDí\0Ú€”±•Ciž	Êü»\nDT4§ë!ÇTw$ót¬úú0UK¤¸üÖ*TÂ¦SQY®Öi¢G‘nlVAWæ\\–mÝ*@á(]4Ç‹h,	 õ\n\0Ž¨yYJËBëirql%“ }ÆÌ5œç—¹Ày.p]JUIáHÅ%¦`¾(1”¶„‰V®Ù¡¨}_û#g-C…{6Hn]OOXíosHeª70kÐX£—À*P¥of|“ýlE¥üd©+ÌCdäuÂÃÉç×sV\0¿o® ný³âkéBtCƒ›°ã‰å }-DÒ“ö2áKtäJ_ËD4Q]nîI[Äu¨2Oõã‘këûÕñ¶Ú¸**’x²‚,¸Y,‚ØÁ<¢…7ÙGŸ&¤é‚8ç³ü™Ì`G6”ÉÚ¹U:œ8¥=pÎ¢lß4Ì8Oç‘Ëâ2S†®›¿€@ Êh!ÔH\0Ý7c:.ßÍE›c€oüAM\0pÉˆ˜ß©OU² XO†ø<QùPÊ¥ÁŠ;ŸV…—ÓÊk%å|‚\Zhé“e]¯òQÓ¯“£¦-á2ìXh7nœÎ¹Óbk6È‘úf¡èÆ¨}#•œcFÁI®I±HDJ1‹ólê&s\\›S’“­ƒLÛÖÞ}uã¸ùÌôÕÊÆ¯R°å\nW­ð¥–µu~²\n\\˜‚QbNÁiÏˆÓváÖ~½ÂÍWøå‚š\r¬Òke¸¥q,ýÎ¼\\b48¼h‚£h¦XaŠ-ÆØbJ¬ë\\á:;Ñ€Š`2™@}”é¦bå~ü÷¯ÈTé\0M±¼ÆØ\n}8jî7¥/_Õ4rs•Þú˜Bñûë!\rþ¶c¥\'\\%èOì­6™Ê|n¹šÒÌ¹Ò·òTé¥ÇøO\\T¦åØ*\0XØ¢%¦	éœÙòS~&tuþYãÔuÖ±/ŒÖÅ¶ìOâ=Õ\ZæüKåä[Î,W”-P7~]£¢Œœ¨¼ß ì*\'ó>+YÄ9ÁHQè±¿CìïQ&\nQWU¿o*YlõœeØFÒ±ó×U^ÉôK…~­0¬\r†µÆy*ÄBðŽ™V¶\";Ò”vN\0ßþéY²\0µ\0W™m÷ÉoéU~%G¯@Y<©!ˆÒW*ÍíuSYÀÑÆ~\rAc4ù©yRa‘\" Ë°Y5ëòoÄìs~K,$òðT¿÷0ñÑº<\0€ªß…*5¥4›>ú)«%¤†š~‘/ ÐÞi¦ØÜ‘Lìdú«‚_ã\nŽgdpdÕÔ5Ï+_6\0´À~:õB\0]†4]ú;¬ýŠ4¡2œ€–plKYlm§­\'ôL\rûEÖ4\'ô“ÆÃR.£7q(J­ÅJ¶³sÒË€ŸþÉA&„È—þªcâ¶(ødÉ C*õ¦HÂØiš§Qû¶ùŽj–$	±[6õN-Ô6Ù5dq˜kD\0Oþ¤MŒ®}€Øõ‡Ò£~íƒØúª\n™Á£@Ý´Nm‡¸ºl™$ Ð1jšN“{4ðãâßoƒ­¶`îO\\AÁQ7$8Ü™æŸiDáF7P ¬¬Œ}gw3À¾Uªƒ8ÌÊ&*{$N«\\Î¨,	¡€†7¤Èb{Ç¬­n°Ì½¯ý›Ë´¢Ÿk…q­eõK‰ë\\Êë,G-‚;À¬5dƒü³ßºj@0\\ePd~VY «BŽmÉßå2¯ð¹•{³‘´\02³ŽÃîä~¿­÷O5k9ÈÈŠ#u	\02P¶TMæåZÒ“Z®.û¤\\-ñÃÆÖ	GwË±z©^cŠlaD6¯®éÉ¤¥Læg‚IÒæLoŠ\06gž[&\"`ÉŸg@(±\0ß†ò\0‰òp2‚Âv²O_-ü}8ç#]8Å›có9?Jdåà°‹ŽoG)yIF@A%r¢ôŒnÁlQW\r\0‡{³ÇÈ»‰Bƒ)ÔòJ ±ùùÌ\0ÑaÊš‚\"u?ÿõœ\0ò„ñyñÍmOÂgS/Á“Nñ\0ˆÐ™y€øt6òÄI¾/ÃàUKøù+´u‹šh)tª\0?Ž–€¯‹þ;¥ö4^Ø2äôÄÓå8ƒ6\\Îl(¤üÎGÈõ‡\\zJ=e7ŠYRÆœåHéš‚sbÀ¨Xçˆ8\rˆùl<§‘å[TŸÇ	ž¬Sä/©ˆ˜r˜Å*]I2t&õ¨\r%è3Jf]2\'q‘Ee0,¥n>¹ZƒÐbˆf¤eu·@qÍOÀ¸\0Îê9ª•”¤©SÉá‚„ñe97‹i³Ðq&\0êUV•›H7m¡\nE´ËHô„š[ü(u“¤“JÅ*µ58 G0’áð(…\0[ø¾íè6¥Dƒ•,neŒ¡?€ƒ§1Ó¸“ôÑåž¾Gö/on¦—2s•Oi£~ìÒˆp£XÏ¼¼_}&ä<èîÔBRéÌÑ™“ûJ‡Çˆó2^\\‰D–4ñ(­h­…(âh<Î:pœ,ÊÖõ©©ù8¢-	q\rú@M!pÄjoŠÛÇK£~î›_=0ýÈkE¶1nz2UüX®}˜îµÅ\0Yâ)å]~N&\\ä’\"	ÓißZýÓ´îiú(ãfu*ÅÃ€ÈíÊ\ZÍ6”ÍXÃK¼\"²Ä*\nŒGÞ/{³üòdÓ„|R×²@-ŽWT÷ VB ]µÛ€‹œ¿>6HV¼±[yãã$æL³TÎ†u8\0ì&ÿ\\Œ(Ã—fù5å\0¹½‚ï“#â®%d¶¢i[š%rg™™&Æ)¡AÀWB­\0ÀA-@ò7’šÊd§oóû?\n\0–Oå¡°Õ[ÛÁ¥±AUûrÂ·ñnÚ8¢u{øÅ&UÛˆÎZ¦3²U+_YVäFP)”pã·ùµý\0ÛæoÒp€•ö\0ëŠ\\¬û½«¶d³Zd\"v3œOéfþJ2=6<™ÌÙ:sÙS§ãa9yƒK}dkÏy¨‹nÂ-5kÙYÛÙ”Î#[åãÜn—;®Øu•á\\CÐâ‘,¦¾@¢VàŠ\"]PÛAê;ŸP¥YV&ØùŠUz¼L0[¸,†@’èˆÙÝ3˜òÙ£&ð›ßÔb/Œê)Qæä	ñãÙ‡Ó|ÑD\nÏB@hß Ó@Ùxyª€Sèfúl¶*1¹•é:ìY”2óæ\"sy-¶UÌ‚œô‡K§}g²IÇ”‹_##”òÝ7¬4nÃª7ÖN9zù»nÎFù‰hu¬*ÆõÄÓ×é8XÎæŒ`Î? ò¼`]|XZ$“Í”Y<š]XÞãC=…Hùç,\n:»¾œ\Z/Z$×|2¿]Üîµv+4òÄ3°¼–;\\¤!uÇì Í²jö-.½”ëÃRÈ5ëÂ¥V`X;1ý«9\"ùçpõsÔ•Œ0ÿÄoI@\0Ô©ówpœU¯§ô6¾>\0ª\ZÎæ|+2	\0Ø“GÔŠôÏ\"££À3Á†²Îá{R5“;6æm»ylãÜ-YFÞ>’rC#E£¡ÞfèrJGfäHÌè}J\")S¹ÕhTgh-¯²S1´ÜÔ!Y…NóýŸLõ.QfÂËç¥ÅZfÄóóH^cj¼}KU_ùgŽÖÉ™Ï	ƒMê#FŽŠ™—.çêêV´çM½â\0Ä“l¾,œáÝ„YÐ2SàbÀÈ–5írEMX¼XÆÃÒ\"Øs”ÏQÔ/dŠºT0?þ™ß|\0\0\'V³¿ÐX½\rS K.#ÜÚ©˜àŠH%PÚ•Ë“Î?“Í ÙbäÎÔz,’#‹IÁç\"‰e¾Ì2©ãu+¬—gî=S²Yu*µõBÚ™tLé²r¹[Å¨ê!ÏÎDaí„ÛW†NÑJ7²FˆZhÜ‚?n¨n_eê¶åCiò=BÄ\r/‘XW*UéÔÄWrr!d[­Žsq(/ìK¢Ã÷+et:ÑSaÐšDÌËŠB²²Db£«¸šj×2\0ÄšRp’>Æ ´Ìºù±G4¡GÍÂkÿr0¯àqB2\r£C?7öˆ`Ž0Å{(Ûr)§XÃ~þïª`s¨\0€&”ÍŠOfÌŠÏËsKÈ±j)Ò¡¦ÛÀxÂ$3\"ÚÆÍ°7ž›>Á2cD\Z(x?!7=/¯ª]’kY¸É*š\\?GÉ¯~›ñ’GÎ×åµj\0’.¤n	\0¥hÛ.z5X¥ÈƒVDÕ#ãÖ]çÚ‡WÃMß6þG>¦V‚„ƒ´xùƒ^\'Þ<ú¡×&™´jèÒtäsAÎî)L¥¥•+×IÔ;¼\r/:ˆC§;\\õ,ˆ\'½ÌÆ’4 fá(ôròùJ 8º¨•›Ï¦‹yè{ƒëT\"˜V³‡-Ÿ£îÞG×uê._ü¡ßÈªàI\0À7ÅVdž½Ï&§\0\"ÏüºL.Ê\Z#›Árr\'‹ ^Çy?Â¼	S?— 3Ú5ÃËÜ™Ës\nˆZvªªB«Œy€„^Q«§|»ŽŽG‘­ä¥mdœ#É.©ÃrÝ\nÇ¡ko‹nøVÍK <ƒº©GÈ@eZ6¾&Ý¡,v2a“§<F½a„WÌl×Ì¾‘˜€âK>\'º<Ìbhh	h(A_9iŒ?‘ê)e,)Dß†fr8/£rÕ^w—\n/Vbæ¼¢õ\"œ@U¬p””…ÅrE”\0ª9#±PõÖ¢úÍþ2ã|Zpê)»ß#‘ô7pÕ­\\Î)àæ~MnŒàMž#%aùFDŽKÛÔBF€r•U¾MH0[PÊSŠ34íÜøb€+&¸r„+gøŠ·ŽÒ\\Ÿ°ÆB:#¦‹\\^È¹¼‘CÙÛèxÍ@¾‡€¥i¹H\"pöN~ÝäÜ÷Ö”rùCQ9¼{÷ã»W:`W£ìjÔ­^QVÜà­œ¥ó{ø–œ%EKÓïEhÁ»ÆT¨ë#šú –ç™ca\Z~®¹‘Õµ·èºc¾n†/`hÑ¸E*`iúéú€Eî4bÅGfµˆuçT_4¸Ž3Î—×Ï©ãMÛÎäYW¸/\'œõ°vÑ1±¼ø‘ÝÉÓÅÚ£àÌã8¢³+J¾Æ\'Tñ&´»+Þ¾pwâˆýƒ´š%·—‚¶øQô‡ÿoÑÌó„À‘Ö€\\‚Wçl$·Ì’Àn;Xˆ$ç/œ<7µƒÑŒHæë¯ðõ„¢\ZáeñÖQ^Eóóúk¸GÄ‘·X®#\"Û­ã„f_Ëý½ìÕ“Y\02ß†\0àì\"Š ØQ›ûàUrŠbßáx³“M~õúKL¯¿ÒìãÐ¢Ø7¨[aÈ¿3£Ùx|ŠNy³J¨Ä\\®ƒ\\Ç ¯ënÐu·Ò©Ã»”Ø´Û=ÇžkÿŽÇ8žÃóúxK×ÁÉ¥Gì›#Zvô¤R€0_WLçóõŠÈ~ÂqB)£n4í§s·oO¸?÷hš=Êî\0Wwzg\\ÅÒ®‘éê:Û_¹Cã\0\0 \0IDATˆ±-4g]‘†ì:À/œOÄv3NHåÐJ½¤ÒF‡û·\'¼~}Â›»ÆïaŠ½ô²*H·(ä¦ýGþºˆBe\"[‰‰ ^P´z3’Ü÷Y×”E\0H EJÖLH–? &š÷{À`Ë¾â´ïàÎ€¹ ¤;„x\'­R¾á=g×ð>\"iQT¼¶…˜³`”¬ž¬¶Õt™þžËDsÏ ±0²Á/Þ†÷^<ÃîÐÀ³»0xýö%¾üês¼~ûZ®¼+Øˆ²e/”µJ­€ÂJ®&ôÔD¢@ÛÞ m\0à¬›àßí:Z€”¼b¦häu¿»Á–¡Ø¡@‰*[£¶¥Dkßc½öð‘“Æ*ÔÕN®ŽëûÓPñ¨z‡ÀA’ÑaœäE¡ÇÍ’!\ZŒ(e—ÈWÄá¬k¼ðƒ<ÙÁ¼SÍãrÁ»wW¼;ÍHì7dk9E£’Ù(ùdðÿ“r²pð3¼!¹ƒ¯ºÙæðª†«*½\"^®e›tãÑËæ‡H³Î\r>Å®¸\"¤w\07=ÞdÊ.‰ù&²ÞJ¶ŒéË¼qæËyÆ\\ÙBF#ãy¡tCä\\y\rM–AÐÒÎVèþ\"~éþ\"¾þx½\\œñ¿ùëø[ÿ×ßÄ÷~ûS™êN\\W õpÕ½V!éÿG^›7QÌéÑ¶4ÍóBŠœAgÏqñkéÕuÝ¡–;4Íûý-nwÏÑU¦Ai\Z<?¼÷o_à½ÝÓùŒùt†[Éísà6Tìj€]°ó¨`1G/½¾¿ò‚KeNŸH(t«²îtºœ0œÞb<ßÁˆ5å|\"œlÞñ.¼º¾ÇéÊieo:ábö²M~üÅÿQs$IŠINpÂV‡¦Þ!rhÁª}~ìžeƒööób^J|AˆW¬ñŒ5Þ!™œ¿Â,-¿æ7š¿2øcQ§ZQîv»¦sùØo/C¢(ÃÎA\'£g¹ÉÃU\r}ú®’‚Ôe8ãÚ_Æ«Î¡/€?òËü—ÿIüÄOþX.%üÆïü:þæßúøßü;·ŸoT´È¸•š%S§—<2 åMclð²²_bÅ¼1÷ÌØ/ÁkWøqU±É²EÓtØïopèž£e¡Å´ð¦Á‡/¾o~íøèö9â8 öìˆè\0Dí4ÕìuàMè¬Œpî.T@‘{¼r@ñ\r2–¸žÎw¯q¹#ƒ0õBnÒ\nq_h¶1Lr½\\Wye\rÇø1¸×äØìþä_‚RE²uÚòR%Eµ°cù\ZTéý“+A8Žé×!ðZr]\n„{Àžá|çYz…e|\rŒÀøPÖ­v]ÛÊ­dÓ8bfcªp¦¹Í†ƒ4ö\Z­GÙò~(W´I&Àß#2tøÙŸûYüìÏý¾ñ­¯ãùó[<ï^½~‰|ú|þÅg8_Î8_O8ésïq:Éõ’átÆ\Z¬å[¹T‰‹µþIŠò2íÞ8}Ìæ5ô¼ƒ§!ê”v›\Z˜D\0|ßüè[øÆ‹÷Q%R·@gÙ[¡¥\\HRGÎ	H(ÙiäxM!÷Q ­3~uúª\\·é-Y8=×ó„ûwop:½Å2õÇñ9òŠ<Þs ÕZŽã—Ñ\0I®²[åÚ;mâðµ?ý×äc¹0‚Hw4;tøHûÊ—Ñéí[LÃ˜‡/Ë½®õ„u½Ï.àc®pÌ<y…—¸^^ý;uðssëdü™äÖQédº\0¶¤yWËI#\0¤Y£L°µ«I8±ÃXzƒÕ=(oŽ8ÞðáGâÛ?õ“øÉoÿ„t0“\rœÃŒ~úÃÇõÙñégŸŠoÝîI–ÀP®µ3ðrûMªyä+¿Ž‹K/xd#\'OÝ\nMpó;$Š1Cƒßÿ1|ëãÃ·>ø\ZnëFÖ\rWUãPí±¼«xÄÚÏ¨¥‹äLƒ(YR²Cån%)ãé2Èâ(Ù¦Û£k.×^²ŸûûwY\r¤KäÍ£M%°áÈÐ:/Ã¿f¾GÍæ™\0à_øfñ’\'vøpów-s^½A‹—(1jaÆº3x‹e¾Ë ¸‡NÅàâ˜ëzÆ¼œ–^ò}ÆÀÚÃdŽ<oãíâÏps|ms\0ð\"ÇáÊöŒótBp‚çí¡#†@´Ïrùo­x“fQH ws{ƒO>ùŸ|ý½vV6-áåë—øêÕK¼|õ_½ü\n/_}%…,QþRÞ–GØé0Š;X´É×ÚåÕù9¿ÉBÒ2lb‡\rÁ¢µ\'Ê|h9;YÏn¾ßûß>—Í& ¨qS·8V;ÖÀdÊshƒ­…{ Å\"¼¡¤…u\\ütºN8]&#Ûíèö—~ÅÝé÷ç;¹ë:]±pF!LÒÛÃ ™ °z!ÇÉð}æ½rËËûÿ\"/f-€M£ôÎ1ßu^Ý*…™ˆeî±.WÙüþz‡¡Y\0@ŽšÑ>‰Þ·ÓóÂ8!~œá8/£Y…Ó—ò‰Ú&U–Ôî?þc?‰ÿÖOáÙ³ÔÏÚ\Z_~ùßÿôøôå0Ä+ÆÔã<Ÿðîò—óUÛâp< Ûít¨5¯›­JGŽGY(ú´l­RÁË¥¿dwpÖ[¸²øåapµTUÌ›;µTM*[ÙE2ÓL+¨„hI¥5So–8©*up8Âšºök¸éžáyÛáXÕròe‰ØŽe‡CÕaï[Ôå\rÂì°ò>Æ¼âÖU¸äÖ0¶í\0»#¯àa¼ÀkéÎ¸WœÇ†¹ÇGÌ¼\0‹õ—R»¯y÷òg€êTkÞû3ÿÙã¥Qc/mÒ;¹YS\'hU%0\r\'ŒÃ=†þWÙ€×À|Ìl>?HµdZBè¥ÿÍp8Rãåû0†àm¡ìØe\Z³ÌûÝ·7ÏñâÅ‡øù?ðe}øá7Pxžèßý½àï}çwðïþî‡·¸ÞáÍå5^Ý}…ë›{Ø®–¿ÛïÀ#/WæP]¯ãå¶;7\"ˆ¦^üýv_Ž²yW¯Š?u»ô2nÕJ€ïbâŒ?fÔû	o#µvëÈínîë…½AánÑ¸­/ÄïïË\ZûªÆ±jdÓß?<Ç7ïáÅñ¹€aWßÀsØdD(ZØo7gj8ñþ`Z¬»C‹î _p¡,|Xpî¯8÷8\r\'\\Æ“|ÌÉ)2ÖÁ“œâÈÚJÉ0/þì¢.`\"ÙÂSK\0TØw4I¼<‘§wFy‹þò}ÿcÿCÿa>ë…I®\0@x}Ê¡äê5ý³\\-—?Ñš°“v»„ EÛîq8Üâ§¾ýûðíoÿ4>úðë8Ÿáx¼ÅýÝ_¾ú\nŸ¿þßýìwñÝÏ~/ï¿D?_0pª|¬ç“àÑÞ=`Ògë+©`¹{—qŽ(pt.\0OºT+éaÙ>Ö\Z7Ÿ§)%7]¦™9¦|)%ÞíÎH¯=µNœaßÂa—°i/7ŠTÆaß´80Pd¬À´/9ÜvG<ßÝàùþÞ?>ÇóãtÕQ®¯u¼n>’ÔÑ!Ï¬Ñpæ/ÁÀµêŒ$mäî¦%âÊ»ç+NÃÞ]Þâîò‘%tõt\\œÍÎ•¹\Z˜àƒ?÷W„ja@Æ9ùÞGì»»‡@°PÃëWG\\N/q¾‰áúóty<!®=b.ýêe,ªTšSöJVVŸ/ª‚»0TAŽ70úä“oà“¿>þ~ø1¾öáÇr·ïœÆ;üÚoý?øµßúÛøâõgbÚ¸±—ë÷÷\'\\.×|âUá£§?«}r»÷vq%Ç¼I_ õRÁÔÊ›®A»«„D¢‘¢NÞÚ9Ké™œ?ÇÂË¹ªèmöÀñXb·ç`ç‘3ƒ–ÌÊ2-ÒÂ‚Á¡ÛáÐíåâMŽ…#§†µ84{Â\'ï„?øÏï¡-wèÊ½q2›R\")œãÁl…“‘‰íy†Ç¸LaÀýp‡×w/ÅJ&\0GèÓì/ºù\"¯×`W,Àþ/gÂJ½*m×yìwB8ðX‹wï>Ãý»Ï1\\_#Èl|Öü)V`¿û,W«0Èã\\_Ž_\'Á)¼n†’72]UÙÀ³wj»`*w’{ï½÷ñüù¼ÿÁ×ðÑÇãÃ>–‹Ã$ÆÐã×ûoãïüö¯á«·_À×Œü+œ/ü½îq>_äÏeEZVÉæ÷LÝ„¸rVxƒkÏ;\0¨»Ë\0N¦ƒu; FRºxU}¥CH3ˆÜæ­®Ý¸¹m±?t’’¦™wíÑï¡-žc:[\\î\'Œý(ñSE6·ó\"®8­¨}…¶h°ovøäƒñõ>Áû·àÙî·Ý­È˜!qog\\DêÙR« õm|ai^çAN8õwxùîKY¼sYšU\n­ m¯k“Ô‰}ñ¯þûº\rl[b/Z°¢†xÅºð´¿Å›WßÇÛW?Àp}“z‹ÎëT¯.“I\ZØ‘*¨8â•wØå“BÕŒ€÷ìi•Qn³Ð©æ²Y»ýA|9Ó¹ÛÛg¸yv+æœ`X/øá?À¿ü¾¼Aú6¦¨Ô/2\Z§ªGÒ1FdÏ!Œ!\n(Ø•Ã´Ž××Ê,d¹«8ÏtÙæò±®FÛÑÐ„á÷ÕPrEÅKß†W²j1i··8ÜðbÉV¬Eœ<ŽÍøæ‡¿OÖ»/{üà{_àóÏ¿žM]Ýa%×îñ\n¾Âh|÷Ÿ¿¯={Ü¾ÀûÇxÿæ=qBÇGÞÓÔ¢òl>ÁkêYJ¶œÕÄ™A2tßÿêîK¼z÷%V«\Z)É³4O­	<JëÄ\næù¿ò\'šl]bÃÂ~gŒòÇþ5úË—xùåïâå¿‹µ%*]^¹\"—9Ê…Ž:˜ˆR@éB+<*_Ãp£å\'fž )ÖªjXÍ½ù@¹Y¥˜bÒ½ÒMÓVr›v?^q¯—ã2bfý€¹9\\¥U\"†7šòß³!ñ¶M–¶GÔuƒ¶ëdŒ½0}Ì¯ªgÖk88éœô´  éd©DÆE~ÖÖ!$1¯uèxúwh;~ÿ	q4øèÙ×ñÿÐ?†_ø™Ÿ}ïKüÆ¯ÿ6þîßûî/=î.¬—xìožáæp+¤uutu7‡gx¶¿Å7/ðñ‹¯áã÷>DÍQ=œËG{´Õ&xŒWÞ®:Á’™¬Z8N\rÓ©G¸Ž\'¼¾ûJÜ\0}>O¼n>ÓCÖ:X·¡–B]³ùà_ûoJ„ÚØul]²8ì\ræé†ëK\\ÏŸãóO¿ƒ/>ûÖË—‚\"éx5ÞÄ%+\026¸ú»:¯Ë²ó<¿{ŸO®\\Õ¹{fš“GR–II+8Ü‚aÙ0à[ÿ_éN€aìÿ\nË‚\0‰CY&aI$5”‡a\"‡»{:‡ª:ùœŒç[kW·<ƒ…ÓÕ¡ÂYß^ëoP\r™Y9¨¦†rÀ	À‹36o,¯È2%›œ#	”æ‘ÒƒCžXŽa6‚Žœ“Em‰=€?<dó\rÝKÍÏ“àÝOìT3AwZ˜Š9É¢‘YZÿ§[dŠ¤ø	Ä^gðŒC§Öû€ %q´>DšhµF¯ÖÁp_¿rý\r½qýu­Wº÷±nÝ¨ÏnÝÑç7oëd±V\\ô­ÝÅìßÃØß6<ÜÚ×áÖžúi¡<*TD=õÒÍB`ºÖtÖ‚ŽeÏ,c½ø®–ë™N&Ot2}¬\n	Npi*¦,0†\r×:Ã6úŠçÿà/êä<ÏýÓßh05$\0Ö4ŸÝÓôô+Ýúò}Ý¼ñžÖ\'·­§O¹H\0jÐ4É0Zà½”tr[™ÚpÔsÂ–õsß›®1˜¢,¡6E¤z¥²Yn0+BeXƒq_‡Yãawm86—órè\nw÷{ŽdâúüO=-Þ–Gê˜MN‹ØqIüñ/á©„ÿ”g»NÕ`ˆ°R¶˜eu:.\0æíäC]?E×Ï_ÕÓÁb 2JõöÏ?Ðßý@7î?r¶±†ŽÕ@‹‹2\rÆ;Úliw¸eå!UÉá¸j˜5H‡ê§CuªXËéF³ÙÚJD´“¤p\':ºåÆü†ç°Žy\"Éã´P€	¦¹¡.²gã`~¼Ëøw\r5aQ\0úýFÃa ÑÀÀb~WÓÓ[úò³ŸéËÏ¦ùñ\rëö™g­¹q\0.+\"–ŠAÕt\nƒ&aYÂq¤<)@®ÀÔÑ\06†´êJU€½úÔ%[(dÁ`îRÊ©Ör\r:;\'1ì™Dçç‰¤FUwÔn—üEZ.šÎÁÅ=Er˜)u\rœg™åmbÇïÉ![ 8›¼¼(lñ±0PJ^ä\n( ÍúùJ£(ÑÅñ®.ŽwôÚ•çôâ×^Ñhë¢Þú»ê­¿þ¡Þÿâ¦Nqñ k3„mÑL\Zïh{°åÊB[C‚ýážv{\Z¦C\rÓ‘¢*ÖzRj6Û(Mz6¦æá²¼Ö)åZÕÂ¢|EŽ†œÍ,qÉÝxÈ^ï\ZrÁÕÿô;,KÍKõ{•Æ£@£µõmV´˜ÝÖçŸþD_|ö?ú\\\rCŸ\r	 ‡ŒÒ+çDh…ÊÔñ«)#›2óæRî™Ù$P(kKN¥h¥ ¡¥¶R©™Jäetô\\Xƒö1É\"ÕÀGdxª ÓòDmšl°kÏ}F>\0pÍ\ZN\0¼q*3ˆN¶ie{´¶c·lg f´œsûÂ«Ý@ð^-éÄy,&k¨öÒT»i¦o^¿®7åÚ9zAòƒÿ£?ùÞ_éÃ[wUå}Y¡µ]I‘©v\0¡!´Uô5.:ÚÚÓ¹#5ˆ‡\Z&C%u¢jÖh½l”%uó±rWÏxa8º„ÁpÓTSÉîÂQÏÌ£Ÿÿ£_ZÈQ–¦\0ãŽ¶ÆLÉNUWO´^ÜÓgŸ¾£Ï>yG|ªrýXZUNŠ“ÀLÂÜlT\Z@ª+*	2~(t”g8o7&I·Øœ\Z>Ê¸÷‰°„•=õ)vÆåÞŽÞô\Z9œÞ’“. ääáIéÈ9½îgŽg¸ós&Ïž‹Ïý=oì4ààË»RQ°—n¸ÃZ­+›¸™Û¡ŠÁ:J™SïD—!MàºŽŒël¤ìTÔÉ£°µ-ªÆ/éÛ¯½®o}û7tþÊKúßÿ®þø­¿ÐÇwï©Ø;Ð`wßŒÞfÔïˆ)šøƒC\'³¾FY_öŽtiÿ’.ì\\T?ª\r”2i\\q²v”§#õŠ-å¥¥·\rh9­hC•ÊõTÕ†ž\r¥ûDa³0É:f>v]^û£÷ôÏü8I7êukÇ‘AÍß*ëÖÍ÷õÕÍ,\0¨\nf§ÇæÆÙúð ùë0i^@99“ófÄ‹Š#^N©VZ¬\'F§ŽÓÀŽd¨ßd¬Q\\)É;I­|\"\0¼\0¸3ÔsÇ·“-\0ýT0ìæv³Ú!%^a ’ÙÂ•o|n@¨­$Ç!º;€™WÃ!†\0W­›Ó\\‚²6M^D›Ìd›fÈ¢0R®ŽŠÆ­¼îè×^ýºþá·¾­£Ë/è¿ÿýÏ·þ\\ŸÜ¿§þá¾Æûfw7/KÍ,W)¦©êÅ]]>¸¨kç®éâþUu;uC P°6)M*²±²´svÒrªA7 ˆ\r†¸a†Ã@Î\09\0–¸Ö!%e:÷Ÿßöe 0¥J½9@GÃa¨$Y+‰ùA\'šœ|¥Éé-?þR|®‡÷ok9=Ñ\nëU€^	Î¨QáOGç\nç¿€ÆnUÎp\Z.;Ù=u5pnáÞMÉRY§À¨9…@ƒö}ƒ3Vï3$`Žë8­Œ¤´›/×6(a£yÚ)-Ñ*tÙÿSQ‘VŠÓ„ãŸúÚÀ{ë¢§Gó*‰ñ,wÓK8ùs€œÓ¹m|fŽìjGIi÷´ÓÛÒno[¯=÷²^~íumíéOøúÓïý/}rï–’q_ùp ª|­Fˆ.+¼BšÇJ›DWŽ®è…K_ÓåÃ”©§´a‚˜+Ø¸i!ãã$é»‘k§8Õò&´¡ŒùD·vªªœÚ+¹\0­ý³YÀÎ~ßå\09\0e ‰`¨þ€Ê Vž•ÊÔ.\'\n| Ü¼ñn}ù©ŽßÓôä¡V§œŒ#Úß¡¨QÒä0má0Q†ú5(xÙUpâÐPpCÿâµGea=z\\<hÚ°à>uµFb@)éúú”…	n¡?9HÚµ@w‘OpB ŒFppR X»À´‰ÄðßBËZ#¯Wd‘ºyOEÊŒß¹d¢Ô5;iz:SšdêîÏ9’¢:Ö¸ØÑåÃ«¶®]xA—®\\U>è»ÿ÷{úî¾§_ÞýRuZ÷Ñµ¢9Å¼4\nr#P°n:ºvþ9½xõ]=÷¢¢ª«¨*ÔÙä\nÖ©J è\0F¬;šº°ÇDª<‚ßIøPö35õÌJÀ\0l†’‚ýÿò=»lX—ÊòF½(Ø@)D„d­4Áüh­4^i6»«¯n~¤[7>Ñéñ}€õ”\0@²ÂgTpB}9\rÕM/’®½Q}òâ¨óÜ‰µ5ÞÖö˜²	b†\n›V¥›…nß¿m8óm†6ÎšÊÉÐ2ÍëÀCñ¦¬D–ÖTs=™€3n¨µMÕ\0!™/¡s¡õ\0ToY`Î #`DÖqÁ[k5§½»²S-Ãw(ÉÕï4(¶µ7º ‡ÏéâásŠÑí«Wýì“ŸëgŸ¼«{³û\nû±’n¬\n?‚`£5Æj¡j‰NP¤¸I×™®]Ó—_Ñ•£W=Eu_fëÌÜ@kƒ›&jp]kbÙæ{\Z½Ú¾µ?åå ¥ à•Q‚Kÿõ/-Øh¥8£OYˆìÉÚšQg©\"¯Uä•–‹GºsûÝ½ý¹¦§µ˜=Ör~ì¸€­ã’g8y$³Í]Š¸~Oi‡*!òBÔ\0@{_}ùu½úÊ«:Ü?°¦¦F h*Mæ½ýÎßêÇï¼­;î(É\"%9O»;	\ZSïr% c´q›°Ö¦AlÙÙá¢Þÿ\'ÄÚÑÝ7M€9ÿŽqÛx^D­6Z/˜òUÖ·§»	Ó‡ ¨6µËm˜ÛE©Î×ùƒ«:Ú¿ª£½Ë:Ú»¢›Ÿß×{}¤÷¿x_÷gl­PÝ)Ô÷´¬–š®¦äà×PÊTgêFÑ@—¯éÚùuáàº\r7uªžšu¦\r\0q…%S¹Y›LMm¯HÔÑþ\ríÈ_¹£ß\ZBrÜ@.xá¿9P¨ë©ÏÚ<€ãŸ‹ã§w0íêvÉ6OôàÁ\r=¸wÓFÄŒ…WÌžMØÀ9XÕxç¢Yï¬ÑG›9l³¹\Zxz,»/åiW¿ùëÿÈÖ•ËW¼+	I—›çÏS½õÝïØúòÆÊ‹TYWC(Z3Ç®>!ÀÌª’ÐZÉ‹õB«rmW€»\"P$wbÒl<™4ŽÅ,\'®-´#M\'3>9Ñ|2WÁè:-”\0#·ÄÖ?mÒ¥ºþüu]î%]<º¢Ñ¾¶GûzûoÞÑŸ}÷-}ïíï´•Ž3\rF\ZíniºšéñäXÇ³So[FIHÃlK½tK®êò¹¯éÜþóJ‚‘â`¤°î«Þp 0Ñ*ƒóØ×w*åÆ¦fŒIò2Ò/œÓKEÐòZ@Èáüw›j6jhZ´nCeY»˜æ5¶ªjf€Ùô±NŽïéøøž&§ÁÕÚ\\ÀÌ“™Œñ¹Œ[l$,{Ã\\—0²#3§‡ÍÑJ§;Îtéüe]¼pY£áØ½ÁêhŸžøÑ‘†Ã>úà}øÁzòø‘R`Xi¬‡Oéî½;ºÿè«…«¹uŠ~ak¾šk2›Ø+@Içm8‚`÷²,&öØ±Ib–ÒÂ“H‚^q>kµÀ– ‹)›ß›ë÷\ZÇºzùŠ®]¾¦ao¤jU\ZÉæÝŸ¾«¼ý#½óáOr%£L1k)ë£ã·ÒÉb¦)¨hp	ÔM¡°.Xzñðy]½ô².}MQ0TŒÔ=Õ¥»65]Iø‘qÔ\"Oƒ(5A`\'\\Œü|¥4ªíGÓÄ¹¼Ç0ƒþÃ´Àqí‰ŒFIÌ¸•y\0Ì›®\rþŒn\\½…êz©GoëÞ½›zôè¶}ÑMfé˜\'×äPªœA3ZÄ«ùÂˆ’ý.˜Ã2#UdJ ¡U\\´œX¿~éÅWôæoê¥®k>™j6™šO(câù±~öîÏõá/>tHßÉ©élínikw[ÓùLOët:QVàmŒÙšúkk™ôf}§Æ(fEÖßáa(1Ê(SZ}èêíÕÚßÝ×¹£s:Ï:^Î™MÍW7nèöúô¿Ð¨OnßQo7Sww¤¨Ÿª$‰\"-(7k-˜\\<ù#Ua-–Õ,ÐÅs×õüµ×uñÂËê…ÁPÂW°D	œ†ÚÓE Ìjc>€9i(O¤\"nÎVÞ©•vÃ©¬ñ¿û÷^hÃåÙØ§™][ÔÑx<ÔöÎXãQ_u‹Œ	ÀÈs6ºÿ–¾úê3Ý»Ëó÷1‚®QÂJY\Zª`ˆGšÏ¦¶°u±\0èú\0à^\r\"MNf¶0Sì$<Ö‹_{Uo¾þu½öâ+\Zæ=\ró¾r¸|GÔè·ð‘=é§S¨i¡F;[\Zoo™æÑñäÄ`¹Æyi¯T	@¨MßÐ—Oœ\0(h»•˜§ ÍV+3“î÷À.ö”Á^òœ‚½Ý]éèàPüú`wK‹é±>øùOôÁ»?ÕíŸéÖ›ºs¼Öà Ö`Ga‘hV¯5/1‚ŒMŽÝ ¼?\0\0 \0IDAT4T\'/”Ä#èþ/#[Î_×µ«¯ëüù%õÕ°ê®*3˜¤çA\0Z—ŒÍ!„:Óê(¬Ÿ‘%¡ºI ^,ucÙ+rsæXÖ@ú¯ÿåS@ˆIä‘üÔ‰5µ³³£Ñx !a~6Ê2F¶¡müÍ›Ÿêþ½›®¥\rúÄT<\0‡¢‘OÃÁµ‰„>tciíZB•ÙiÞ1-ìwG¶övu´wd±«G—tíÜ%k‘6ëÊ6çÁÃ‡ºsÿž½\Z6À`^;ê“<s˜øªÔt>×‡¿øÈÖ{÷;H0°Ñ ÈÌ±égÓ °¿‡v\"Üˆ—_|Q/½ô¢ö÷öÌÖ…J%Ï2?C)44ä:~x[ïüø¯õ“ÿÝ»©Ç\'Çæí3ØK-\0š4ÒãÅLÇó•Êm€Lu”jÕP\nÓO(Ëv”¥Û::|A.¼¨ýÃçµá©¯œ¥|Õª	\0z*fÈáÚÜ°CÎ‰U*Cõ’@ý8P?’½\Z‡Ð9Œ«¬ ù½ßöÀ¤ŠÐ#i¢D[[ðív5\Z\rm°\'Ÿž\0ˆ^?ÕÝ{·ôå—ŸèÑÝ›RÆÄr½²LN¥9[[O\Z—.È½Ò¸!	$eØÔ–¶>Eœlüþî‘ bŠ8Ó7^ý}ãÕ7t°µ«ÍP¦€¶\ZÑŒ„#ðæ¡³T‚å,¿äÏ¿óýÙ[ßÑ‡~¤r¹1/F=w¶5öu:™h2AˆqxOýAß6ÿäôÄºC¿û»¿£ßýßÖõëÏ;Ck«AÚz?L´Š4ÐÝ¯>×ÿêëõ—šß7¼Þ2 \0\ZìíšÉõÝcP;S¡%èöuu<[«™ ¦1Vïªöö®ê`ÿ9í<§ñÎ%Sú`mªLµ\náìnn,Þ’Ç`])¬Ö@F7¥\n6ž«<\nÜâ$pÇgÔ øWÿØYÇ\Z1„F;à\r@¹GéLL %I07ïöºêö2ž>ÒƒGwuròÐ4q]åÀÜNÀ\\«Õ©–Ë©Ö«™%˜,RNJ®†ï¦²6¯yù±Á¦\0GcEÖZî¨§º~õ9]¿ú¼FE_‹ÉÌð€;;»:<wN»{û¾§ï”IçCÁà×?zûÇúÛ¿­7o\Z\"ˆþÇ>ó|DÌ³Wk _UÌúmf±€ëÐè›ß|SßøÆ›ºpxŽÞ&Å¢.èÎÛzøèñð>ytW½÷}ôþO´žŸXrÍCÕï+îõÍìzº©4£w·FP\\ÓU£Í\"T˜íhß6þšÆ[5Ww°¯€\0¤“ µGë\rMõmƒ®M£¨\\)iJ[Ý˜5ôÀk/ \0¸<,|ôû¿i\n!‹ùBž\nZš0O\00Æðá­’A;äM–†„?T\n$1¯y71Ž?ógÃóù±&hKTÇF­QÖàKèp·Ú	\0ºÇìÉ²]‰È\"ºYWý¼«Ýñ–-,Q\'Ç\'}éåWô«ÿà×ôÊ¯j^-5_\01ÙJÓ4båH¾tôÕÝ;úêömMfsqs}B\\F±°Ó$r˜EÅ´°«ýƒ=ÃïqxRÙüòîÇzïÝŸë“Oi×I‘†*WS=¾[OÜ6ª:Ÿgƒþ€:5mcü\0ó¡Ö\rBŽ±VXÈ+5ßà¼Ø×î>\'À5åÝ=%ùŽ¢t¤e‰âW¬MÃæ;üƒ5\'[ƒpž]„ÙJ”ÃJ[½(°ÍvB:¼ê\rç‡	ü·ßj¨‰X®\'èÐDJ#õcCò˜™¡#?öCu{}åEWy7U’àíÛ1@•Ý³þ¥NNèøä?¹«ÇïéäÉ•åÂXE\\	Æu7ü@e÷l`CS£ÕÈ®\0&ÜÓx0Ò¨š-º7K<~¢\'ONô­o}[ÿôŸýs}ë›¿®“Å©ŽO`,qÍ8Feš°<é=bdP±4È4­§:>91²ˆÍû»¹õÒeà4pdFÈ=|ŒJÇAêõ³÷~ªýèúù»?µž£\nP¶ÂíÃ•[›0ÑÉbc«Ir\rv5Ø>¯U˜ó|)ˆ\nã‘ŠÞ¶w¯h{÷²Âh¤\Zó‡Ù×6P’Sk×ŸIñúk€¶MRm”Õ¥ò¦TŸM\')‚0Ð0º&tís€½óuS\n’)Ohv÷†¦€Q‘dÐ·gÌÙ¨è²ùÎäÄœ\0>Uú`6{¢éì‰?¾«‡îèøÉ}+©Œ/ÖÈô;Mj@h›!ók\'®H©•§¹ºœ8øÛø¿W­qÈDÙ|¡«WŸ×+¯¼ªk×ž×fe‹D€ˆ£|s‚AòäsdNÌ`Äp	Ì êÒc|ñ¦28r¼sÏ±\0p8AºŒü†Xwî|¥/o~¡;wo[rl9~Î\r~KäíëÔQ®ÙFšóîdJ{ÛJ{»ê¤[\nÓ±Âd¬ ©”{ê\rÔœÓ¦)´,c-©ù9!X(±\ZŠ×™=£Åä/++¨§4¥·ñ[a¨±_£@êñ˜{›œ`÷÷Û\0˜iÅÀœ†MêFÏž~Æ¤D@?êÚÅ“EMMGŽ;Ô¨Û|œ£PiµBµrªGîéÁƒÛ\0¡ÁÆ©?]Ÿ!5cD¯‘lrju>®+·DË9{óÍ\"czAöêüŠ¹¦ý‘úýM˜×óô·ƒä_ø}tg³…ÁÂ	’VØt<ÐIÝ;¸˜S5míBLs0dšHÐ\0Nõ“Jsõ¢¯€üJÕjiöòå²”Í{0iF¢‰m•øþaÚÐ¨¿uN£K\Zl· èÄcÅé–’|[i¶£ùª£ÓY¥é\n>_¦˜:B^[²M€[¡ô¸¬”UÎ5¨hªÿ/\0:Úêt4B¡„‰-üA&ª£ßûú™cÈƒvÈ–),U:»^@™»è5	b^Xc%ÏÑáaó¡HCð`nNSÉeý\'\'ôäñž<VÜq:l~–t”%YHþø\"=|pOïß3k”^·°Å±oKÊH‡’C¸\'Ó’Hsšs°»Uˆ\'`M<\Z‚Š£t3tšLgÆ\0ØHIhãÔ1{[5t0®kède9Ì±îOrøwT!æ!¢_;#íui#È4¬Ll+*TwrUþµ‰0‡îk¸}QÛ{—-âlKI¶¥(©\rFÍ&óJ38`Œ4;©ê0:\0/ â‘ÍµÿygXmÇ<W\0\'À85ît4	€P}\09æwÿ‹×¬\n næÄä$V@ÃÃsëœ™¢’Ñ\0,XÜ­ö&‚Ê…HÊSm„RÀ’+³‰VË™Y¡¦(}ðôó&#ùÆ|³Ôj>ÕÏ?Õ—_|fœ¸½B{»[Jìë“µ–›…õöá¶-¡²vü}ò—p‚O,yÄÁxLNO\':=Ú¯©ÙûÃ£z[¢çO…Ð¡ƒ»ý®-Ø>äërí¦	ªß•µ–Ë¹ë(‚W¨À1¸€3Ë]Ã/*=ÈdUudèÿÔÉ‡Š‹±=åyo_y_E_yoOEwWI2”Ãp\rb­7ˆ: Ôí5íÕ\rïœs‰c9ÑÁM÷ä÷ÔXôÃ@îÿ€ûßÀÐ€ë‘ƒ÷ëŸ¼d‰ÆÎMÇ»wÜ®Pž9eRê0ü&È©ÛÇ|¸wæ´é,bœ‘õ0Ìbºf<šÈ–PúÑAËSº‚èå1h´ZLµ@´áÉC}øÞÏôñ{™9ÈÞÅB—.ž3¤‹2ÃÊFÂ‹\rŠá•b§If›ïÜ´€h-µXO çãÊI\0@Åžœêädn\0”ƒÃC®o:\ZZÈó»\0át´5Òr½´q¾ZØ‰ÀÉÀø*6Þ\ntO\'KSªA~†+0é@Çv7Öìt­Åé7ç\0ÞßV0ØQwt þðPa2TÐ¨“ŒÔi8:PšM€(wNT]wðêfgN*¦ÙàL*Ñ\\ÊýÆw!øªQ«™ €«¬Qà6O‘™“Ñ@­¿Å	À1Éã\0Úë59Ò3GØp~=väç\0\\ó…cÖ9‚àp…ÂH¡\"ëÚ`…»œ\'™\0È4È£DÊ“@5¥!ÇéüT7¿øT7¿øDëÕT[£¾¶Æhõq×ª:µ¦ë‰N×ˆLi•q-K.\06kÌL»C9ƒ ÜÁ^V~m”î‰9ŒFcÛdf´†M!ÍH*µ\r™8hÓbÈD x6›P±	\ZK M-…¦SGQs„.³L³i¥ù)Ò4ÞW<>P1ÚUÖßUÑÛS”Œ,óç5-¶UäEÎâE¡™ySg¼A²n¢—Öºs:‹Î’©_£.>›ï_»Ö<–úpƒŽ\n-zœ\0Þ0 H~û®ÄñÆÏØ 8Põ°¦ú*@ì™ÔÛ $äVfÁŒA½Šã(´ñh%êæ}õº=õ O€9^¦êæ™zö´Pþ+ßhròH“ÓGZ-±Q§aäzÚP™«°ÒéòÄJ½y9WizyNqs½\\Y¿¾õ¸b„18—rÊ#6à¡Ÿñê8ƒ6uý;\rÀöÃ3p%aaWíeª…vŽ0[:MÖHê’Ó*©2¸Vj»ùLfèT•¡òÝó\ZíS1ÜS”\rgc»óÓ|[I66Ïù0@Y$À((Œ\02­×e2Íc×áh½mòGßŸOB—/p+pÁÀOP4ºµKüzM(z4²HÈ8z¿õk¦ˆ8DÅ8a³FsY¯a²MGÀ>Ò¦Þú²DÑUÑë+Ís-yƒ–®Ë‡h:½ƒñh¬aàN‚NdýóA¯§A\r‚D½\"Ð+£˜©²\08=~¨“cFÌÈÉú\0˜Ÿèd~âÀåÂž~Ä¥ÜÓ¿6Ö–†ÎÌž¯GéÈÕÆQ7è÷Õ§gS¾u>¹ïin‡€+daÎj/S£åÚÔ:™LlqìOf3[ÃÑH»{{\ZŽGÞs‰÷Þ@¢­~sìB6ÒöÁEm^T>ØQ\nÂ®²î¶òîŽÒMBÇù+é.+mÅ`h“ËÆÒ¦w%³Ã§9?bª*ÝIBŸ?TÁ\näòÌ]êFe|Ørg”\0r€îoüê™{x½&\0Ð,!h¥`½°á×Ü‰`²ï<QtóLQJŽàX³&*í{e	sJÆf+9PæÌòƒA¯ÐÖh ­1óô¾UŒiÍ¦\'Ö=´ïÅ×ÞðWåRó•ç\nÎ‘ŠÃìrfózÞ$rJHN–w½1M\\fý,þ”ÿ†Á¿éÐy!z4ºà´)©\"˜6ÒIœÎ]I	¡u´µ¥þ\0UQTÌx/€gZ¬\\\0 û×ßÞWû@QÙöDu©÷\'uâž³tƒK‰Cø¢T¹`vŸ*·ÓŒ¢ßA£ÄA]žMeñ~ Ò@Ê;ºq¤e4X¡ªVj€öˆÛ|ƒ¸Z#üÉ¯¾é¤b×kY\0\0ßñŠèN·¾„n!P˜v¥)cÂ2vP˜žïÖ‚WÈµRŒÿ	†~¯¯~¯ÐÁþ®Žö´¿·c³¨ 9\\.ÝüÀàûÌ-Ù¶…&ÓMNO4›L4›N,LÈèþå–pì}‡‘à€„éü;è@Ú}Ê²ÆQã8†1}®ŸmSi!£?AIÔz	KÍ\0Š,–Öcó9Í€\" iãàE×‡ibh=þìèþXé`Ë4W6Éƒ‚ì‹þ~fâŽôó*kåq®^1”­QSb(îÂy(#ñäü\0•Ûi*¥a¨~–ª¦#¹IU!Ö®<èØ‚\\ŽZ™¥Fv¼ñæYˆ˜“€iü0÷W@ûÊu€wF\0@K†×8@&õ4°$ÚÁ<Q®!cLloÈ@\0\0±¼À`_çtx°¯á°¯Ñ°o§\0ú›oÌR\\Eœ’8gS6J\0ÌN5ŸNµ\\Ììˆ„¯ˆ]KžP%\0ï\n|\0xËPOd±oˆöCE\0ðùQ+A_ 7Í¿^Ý!žjH,HÂ”¦\":_¸n\"óJîC@Í‚ó¨Ž€ŠqKàN\0š8b NÁ0t	Cò”5Ö1hdŠáN@[¬T-ÖêÒ6ÎSua½Óë¯Ö×œ„®§\'O\0o6Í5‚¦—eFÙ˜Š–©”¤swÀŸ•^ñ\'\0Üù5å˜Í,÷?*fÜ„:8`Ú†ã„Ð1r8=o4ó†×È~ZV}Ò1ìÙ}g{Û€;;Û\Z\r‡\Zú*rš9î‰µÙ•‡W\\¡!!³ãªÕr®õÒãŒ¬ÊÃÖVj:H\ZàM–c1Ù¯½—µœ9›ŒàÄŽÇÈÌÊï+Ü=EzïŒbá\r’ 9Ái¡Ê&±£|]ÇZ×‘ÿ“e¥)Ô¬§\0i¼0ÖrŒAã)ïpc¡Ï’*‹X\"9¿V½ÀZ>Ó0ËÔË{&™3¤,3×p VÒ”€ÌW@Qó\0´%·%Æä@%^((¶ùæEáíƒë¯™g‚t¸`ã Ì¡”Aë3¬¬‡§Çæ›ôT¬$R\0Ú¯\0¥\r€é)Z³ÂÙ¶á<ÂÕàœ;!ZÄ,lÜ<Žœ‰â`dØ?N˜ÊEž›±‰’rš<!¨ÝTHÌ¢3Œà4cf P|EGWGÖîY|¢ã¨»  14¸iøãàð\\øl¸9þ !ºï;ðNp¢UíÚ¦ÒÑ¡ôufnfRkUZlXNÀtº¤zÙh²®Ô¤¹š›÷ŽÄrÅÏÁ)À¢\rÚ¤“\0h€%æP©Y¦~†×0¸™›xŠ\'´âUÖ¬ÑsrWB‚©Ië…éhÚÜÞFÞ[+8¼ö’%îµåÌ\Zàç#«ýé»U¶é)OûÓÒC8ó)\'e\"ß½jØË’#ÐQtOÛÂÑ¶Mrëå3t\"™Bkw0i0à$àudŠd÷	¼Ã ±ª”Q2D6Ý`Å4B¸ëLŠŽÒ	Xš’H»Fê60Üæ;#Çék{ŽYKÙû5îDhÁyZñàI@§©X\'Ü–‚VueOõbÓhYòJ\0 o´ÑdSªI3Õ\0¡æ•ã&ØIÂuIÒìœ.&ÿj£f¹ñ©±ÅÉxÛ€‰\00»åVFÖ[ûµæYÎ1Åd½’#¶øâÎL|péÒó–àJsuœ8s=r‚aÜš7ÊÀ$+Ì:ö{Ì³\\8¢£PU¨&éB§/IÕ‰™u;Ú\0|x>îDLê¼ørÖW¯?¶²q4ÚÑÎ6zA{Æ{·ò‘’ÔØŒYyÚÁ8‘ó\\¢1X X‚dA`Ý-ž~´°v×	*ÛPÈ;Ž:£RÈ(¨•;§¥=·º†1‡iåÖç@oje$“Jëu­AP6&ËÊš®6š¬Ö\0ušªNR­ÃŽù\0¬9êM# ²ù>Í4žnôœPÚ×:ú©Ãó™·0½ÊTOÿjM\\œ¤]ã=9¹\0”5ŠÍ+ÙÁïi;‚ßk<þŠó¶ò¦\r\0ê`6­ÖŠiÌT7óÄîü2lTÒ„È\"uòØ^Jl¾Ù8¿—æ™¹cðõ‘\'‹R…o,®\\„ÑØÖx¼§}Ä’öÎ™:7Ð+#taª¼œù9;óìÆ®0	6_ ŒÍLô·Â”v:¸§ŸŠ€¼€Í§R€¡d‚Oˆa›\\Š“²!\0Ì¤änÍí{ \0V+6š»–\0\09,‹„bÆZ£ãW–fµÂ¨i4cói7Sv&‰ê$Ñ\ZAh{è¬ºGÙÜDAðF²½õÉî‚ãKd¿O~Î\n@2Á„Ž9e¡Ç9v”\\”¸æ=ä6ßŠFlxµá,ŒþÎCèA%Á+‡-\0f³™\'­šåŠ36{m£ÉE‘Ùj`à¢¿lrU±:3oS2S+5¤yS«S$ŠqÉ\nûfJ#ûÇöq„*&}ó°PhJ#sêèvµ½}¤í#áÙƒ”I²U²ÍBa½2Ì2<ý<ùŒ6¦!‹#Þ+“ú«À€«x%Qâ \0G\02ÉÞî{–¥K´±D|dÀ†3p0[˜AëÄIÐÚ-@ðåýbÍ7+MY\0NãXekÓA§Ã€ó¼qV÷´’¨3F¥\ZÈéêù{_j¹Vè3}{ÑV¡SÉùÁœb˜`”5õ­‘å,í\0Äð³’³Â;Ã¯^ð€šœ\0ÔÄ™Ã:|u©¤(”ts5QÇD‡WhÒæ@¢È\0A`ÆU(m‚œé¦J{]%EWÚ\0Ü»È¹u•Œ©¤€Ê¡£žâÁ%’Â}ÆÚlBkò”«‰m¼­†E«˜6(>½ÔÄO±³Ó)¤,ô	¡¯$,G°?súÄyä¦‰éø\0±Øp{úñˆÑL.lóãv\'\0ƒ¦Ì9‘SæúR×Þx®pú*u©ùf­Y¹Ö}£8R%á\Zv‘ÍiímC\ZX\\Q\\¦«½QFíÞ	íÞ7CªõÚx0ÀæsBóµø:®_TÁ×0¡½À…\r“6.Ø©ÈøYþ;ïà£ógˆ Ó©\0dZi…Â¡›\0Uiº¼ÀÇK¤ÓòH1ªÔ\\$Òhéú\0à²BÊõi\0D\0øâdýòî–\0\r…¹È0q#\r†{\ZwíhM§Z-Ža¬À6röª4ˆœµsÓpœ~÷ôEšWŸ¶Ë»Â[Ã}!´\njG=Gf®\r\0XÌ‰Ûx\0£‚•NKÅÓCd&òäúä^š…}óAÀ&@ùž—ÍqùètTÒÇC­ÁšÆwL÷e­³Ÿ«¬v²ù\\W\Zòˆ²T§nš\'vûÀ×XÕ+Å9þ¸x@	€†.\'âY\Z’é!×fjSY€7Î{\Z\0“™e2(U’i]ÕZ0EãÈ\nÅynê”+»ëÖ–ý“\0$…m\rõiÁÓ^Ø‘_…$4Oz>\0˜¡†¹šbc×®L™úÃ]\r@­éŒFÏ±iÆæ\ZNƒláÆ™LøÅI@ Ø†ûÍ·Þ9Ëúè–òùòÇÕþñð\ZNÊ;N\0s!ÿà4hs= ØØVx9%w\n˜Vÿd¸¸TgÀæÚ„îx¦ôfÎÐšj3wˆ\0± G	\nk]*®ÁBƒ)å¬{Èmá%ð .+4×öŠâ)A@õÅ•ÀõÍiÊ©œ¾Þ‡	f#{üÛøõ@¥‰\r;f–­¼*É\r=³„e:~™’ßH—¥–Ø¶\0Yb•€UÔi¤Û”‹\0(òT1I`–›zð¸YÂ©0PÖÝR@\0p\rtü	€bvîò€þpG‹emÊÞËÅÅ	Æ:Ð%œ9Ó\nˆ¨ÞEŒLí>sêÁÓŽ½s¯—“z*&FIj5½“®áÉ ‚Ið2³„é™TÇL¡x Ü©Àéh@Óq¤f½\Z‡‘4ìîuøU%-lU¶ñ†	Bàýã…*Ì ÛÔÍ\\\0„l€1=ðt^Äp*[°¶q…¯ ?oÀšrT4¤ÜhÛ:´4Ð¼a%ÄL&G1ó½€7/6,\0\\¬ˆ`#GRºQÎlJw*`™’Ò³îø\0X»M¦#˜F¦Aof‡ôèÐ ¢D¤eLùãF¤?â¢§$\ZŠœ›]q×’B\0;\0«u`à‹ÕæDhc„Îª±CP@ÞÒŠÜVî©%ñ¹\'ÞÍ‰ŸšI;ÿàVÛ\nšëS˜wª ]+QéÑ7#1t§‚3‰rAá4Ž‘¾£ÿ1š*ÇËÀ’ë·S4P€ˆ“¹;—W¨h;2téBkºf=[+¢ÛhÍ)¯feœDçÌ]¿\0žVn´„k†XÇ@É”«Ñ\\^BE\\54ÂêÆ`v\0s\0«ß¸tdWÀä;•¹ýF•¶FGmõ*½3q \0+K«0‘¶N ˜:t÷\\¡­\0…¶SCJ,1þmhKÔ›’žëcQg†Iî$Hòzƒmõ‡ÛªêÈÀ—ØÆ£NŠ\'Ðm½uñ¯(éÞWoh}fÌíîZSý2óh÷ô·®a. 5Ë›ËMcHwï›Ð¥FÑ—ÈÏº„ø\n1;ÀíÌô1L¯\n´	j—,[ÂŒV7=VV£ŠšÝ‚’ïËZCÉ£SjÔèeaBÝ>ýÎ×È‰l;¿?N™e]iQ•ZÑc&c-NwÖÑe°\"ƒÊÇ<¾›\r$a¨\"%x	l)xùêù†R/S@“LƒÍ1kTgtÌ¨—€\0D\0Ðõ2Q#î? EÌÞ^Yf€!=g3‹Eê†£\0 i2Ý6ŸÖ1>„ˆezD.É!šF `ÐDOÐ¼	±ž5á/iÛ\Z@¹W/FîE#ÛM÷	‘Wÿ\"9â)¦3I\0o\0OžÆ\'Jm@‹¹[:—vÐÃðŽ£yÖ5{ZÛ\\ÑnÓÝbãq_³ù.x˜¸ø<Äy\n;gs#Ës\nÙr\0eÎeO_­Åºr“§Ÿ¯QãÀb°Mwêq\r\n4åm*Ø4öÊ´°0ê@Ás×\\ÈÀ¢­i¥)jß6ãwþ}D°,©)Ír™S×ïo_©E­»enF©5~Ì©ŠÂ„{¼1¥MÐïj@c„“Q… b˜Ô¨¦3•jp)Å€\ZoÆl<w“ikª³Çþ©â£ý]×p±¿KfÜöûí{ÇJí>‰’+ {|™g:‡îØç÷m\0„@TV˜÷úVúæ‹®zÉ$Ž{îä6\0\Z8vHdþJ‚mDnžYÑvù‚^ÙZ¾†;QÐY­íúeÓ­	FU„ã	ÕA]ªSnÓ\r­+eA ð.puàâs®d®U	A\0\0eIDATZ“‰QµlŸ8Ÿ¨Xâá{çnŒÊ›ESÑ”nŸ¦ÔZ¥lvë@\Z¢°eSB-‰SCú­œPç’{Ë¡}sÄö%˜B‚ýv˜„\06Ðžf§\"âRZÿoÈðÏ>v\rs6ÝÕÜ¼¶Ÿ6x½“8w,MÛ`ÆÚnêÇ+hc–³²sÂÔàsxinI$	2þ¿´vIŠÙ$ß‚·ŸÒªœ÷yI{SùTÅ†5hú \0ôK‰jxÝ¶èµ™\n½>?×Iíol´p‡BÌÁpZ¯”ÐÌ«K8¼†\Zg°ýç/•‹éÄe í}ê*SÓòÉ‡“33<¤ýçê?Wå&ZdF@¡ÑB5œ…„I‡0‹\0àêp×Ge‹½AæöíF·VQØð‰å§!./sOò³«ŒX‹Ómn§ˆ5ÜÆ»SÅMõ\\0¸ÓËþ	7;`‹Í÷\r5á–•Œ&ÂZÉ\"|I®ÆÔ’3®@‚™†Œ5e×7ø¹IÌ;9>ötÇx2©}f÷!½C8ýeÇõüpÛ>/ó>w;—!˜‘@GcV\0Þ²ÙÌU/f\n–%”òÐÆT[‡L móø…6\0¦ªf¸q‚<p¢ÿÙý>¡n¥5]Ý§†ÎåRe”sÇa¢X3ª¡†x¡è4+[!w=%Š\r‹˜ÒíwoÌÄÁäƒ@ŽÀ2™L‹(»ç8\ZüSoG–gnØ“þôZò²Y¶énãý¿3Ïû6(|€8·(÷w¼àž³ÙXŸÄr’I6£@ÙèN!Þ4z4»Œ½CþÂuhWÇ8[ÏO‰ U[ÞµÂä }\0ŽW’@!0bT(qµò=Á008 ²;ÜÍÌ„…(ÙX\0ä@ÄiÌ­¦*ÙÓùTiµ±e¼Akœ¹V0|î‚±ƒ™Ô³©ç?\0îgûûU–%Únó-\0jð~\0.‚€.«®™›[*bË‚Á¬èCë!0s\0^fzKiæÔõëÆÆÒIá†PŒ¤Ö*­ÿm‰ÕÆmfÌõL\0 2ÉÜ¾ÚäÏo¼éÏúgýLþÑ€O¸,Wi]¡LÇ32š˜K8ý­ÅDÕÍ;¸~|\0µ\ZtôGZQZƒEP…\0s¸[Ê3#ÊRƒûÏ`Mÿ\'®>ò%Þ7\'ñjÇ†×´Wþ!#CN\0”@˜U,Nµ™ž¨žžÚÓŸ–¥\\ÈZ‘(\0?²\0@# ý¯åx·ØVÁq·À9D·É€?ð¿cpB)âÅ€c\nÐNXYL³ˆ\0ÉÞŸ	\0„òD)PÄZÃÉÓÆBÀfšv=­í±A¸O,íÍ÷ð÷Ào>×ž\0g¯íéàï@Ó”¥DMÜ,›Z\'1ww¿eçtôü²æô³\'ÈY\0ø„Êø….\0Œ‹è×†^†ÝD\0ô‹x9::€>\0ìçñO¤yÄr¥·pú›ßà,\0Ö“cÕÓ‰Òj­Ä`£Œž€€ÿjìTmÛ1¹\0\0\0\0IEND®B`‚');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--

LOCK TABLES `user_logs` WRITE;
/*!40000 ALTER TABLE `user_logs` DISABLE KEYS */;
INSERT INTO `user_logs` VALUES
(4,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-23 18:13:25','::1',1,'old email: q@q.qq, new email: q@q.qqq'),
(5,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-23 18:14:27','::1',1,'old pass hash: 5fe329219ce143e4a1f772ae22fa17b85f93f047a53fc58cd2ab5b6d17502a85974474372c141718054cb045e369554e04eb599a8ac9956ad059bbe54284037c, new pass hash: 35352a2e7e8a0e793ac5fac97e3f504358fc7612707ffb165f459b77f7ff27bbf57d24f3a60492478114d078c7d86a8016ed82ce0c35efd2595509a909c34fd3'),
(6,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-27 09:39:37','::1',1,'old email: q@q.qqq, new email: q@q.qq'),
(7,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-27 09:42:32','::1',1,'old email: q@q.qq, new email: q@q.qqq'),
(8,'fb2b2e63-ebff-4ed3-a15b-fda45e3452a4','2022-09-27 09:43:06','::1',2,'old pass hash: 9e38343ad0870821cb1180960b5783050ac50a63f57b8ebb43816ef4e4d7f0d66f5ea95f9abc8c1dc29655d980295d5a149cea344f0e8490b33065eeaed6ba64, new pass hash: 86c4a75e0ea067da4d0fe477463043eeb4723b81d59edb2842e37ad85c7790c46cbad4b7b6f119d281696acf3e13648d499d4db5dd767506efd75cff6286ba19');
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
INSERT INTO `users` VALUES
('fb2b2e63-ebff-4ed3-a15b-fda45e3452a4',0,'Test Name','q@q.qqq','2022-09-23 19:12:33',NULL,'2022-09-29 21:40:43',1,NULL,NULL,'86c4a75e0ea067da4d0fe477463043eeb4723b81d59edb2842e37ad85c7790c46cbad4b7b6f119d281696acf3e13648d499d4db5dd767506efd75cff6286ba19','ec1f359ec97b2181ed1320fe1d32e786','29248eae-dfc2-4858-876d-34a0bacea571',1,'2022-09-23 21:14:49',1,'2022-09-23 21:15:13','00a691fce6b1453c96035b800a9f2406',NULL,NULL);
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

-- Dump completed on 2022-09-29 19:09:46
